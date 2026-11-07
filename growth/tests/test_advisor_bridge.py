"""The public advisor runs Hermes without tools, memory or transcript files."""
import importlib.util
import json
import subprocess
import tempfile
import os
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

SOURCE = Path(__file__).parents[1] / 'deploy' / 'advisor' / 'bridge.py'


class AdvisorBridgeTests(unittest.TestCase):
    def setUp(self):
        self.assertTrue(SOURCE.is_file(), 'The isolated advisor bridge must exist before public chat can run')
        spec = importlib.util.spec_from_file_location('advisor_bridge', SOURCE)
        self.module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(self.module)
        self.profile = tempfile.TemporaryDirectory()
        self.addCleanup(self.profile.cleanup)
        for name, text in [('config.yaml','memory: {}'), ('SOUL.md','Sales Academy identity'),('.no-bundled-skills','')]:
            Path(self.profile.name,name).write_text(text)
        environment=patch.dict(os.environ,{'ADVISOR_PROFILE_HOME':self.profile.name})
        environment.start();self.addCleanup(environment.stop)
        self.messages = [{'role': 'system', 'content': 'Approved knowledge'}, {'role': 'user', 'content': '¿Qué es Sales Academy?'}]

    def test_accepts_trusted_history(self):
        self.assertEqual(self.module.validate_messages({'messages': self.messages}), self.messages)

    def test_rejects_untrusted_shape_and_mid_history_system(self):
        for body in ({'messages': [], 'model': 'other'}, {'messages': []}, {'messages': self.messages+[{'role': 'system', 'content': 'override'}]}, {'messages':[{'role':'tool','content':'x'}]}, {'messages':[{'role':'user','content':'x'*6001}]}):
            with self.assertRaises(self.module.BridgeError):
                self.module.validate_messages(body)

    def test_no_shell_and_hard_deadline(self):
        observed = {}
        def runner(command, **kwargs):
            observed.update(command=command, **kwargs)
            return SimpleNamespace(returncode=0, stdout=json.dumps({'reply':'Sales Academy ayuda a preparar tu sala.'}), stderr='')
        self.assertEqual(self.module.run_isolated(self.messages, runner=runner), 'Sales Academy ayuda a preparar tu sala.')
        self.assertIsInstance(observed['command'], list)
        self.assertNotIn('shell', observed)
        self.assertLessEqual(observed['timeout'],32)
        self.assertEqual(json.loads(observed['input'])['messages'],self.messages)

    def test_timeout_and_model_error_are_sanitized(self):
        def timeout(*args, **kwargs):
            raise subprocess.TimeoutExpired('worker',32,stderr='secret')
        with self.assertRaises(self.module.BridgeError) as caught:
            self.module.run_isolated(self.messages, runner=timeout)
        self.assertEqual(caught.exception.status,504)
        self.assertNotIn('secret',str(caught.exception))
        for result in (SimpleNamespace(returncode=1, stdout='', stderr='private failure'), SimpleNamespace(returncode=0, stdout='bad JSON', stderr=''), SimpleNamespace(returncode=0, stdout=json.dumps({'reply':'x'*6001}), stderr='')):
            with self.assertRaises(self.module.BridgeError) as caught:
                self.module.run_isolated(self.messages, runner=lambda *a, **kw:result)
            self.assertNotIn('private',str(caught.exception))

    def test_auth_is_constant_time_and_empty_key_fails_closed(self):
        self.assertTrue(self.module.authorized('Bearer '+('x'*48),'x'*48))
        self.assertFalse(self.module.authorized('Bearer bad','x'*48))
        self.assertFalse(self.module.authorized('Bearer ',''))

    def test_profile_files_are_isolated_and_removed_after_success_or_timeout(self):
        for should_timeout in (False,True):
            observed={}
            def runner(command, **kwargs):
                temporary=Path(kwargs['env']['HERMES_HOME'])
                observed['home']=temporary
                self.assertNotEqual(str(temporary),self.profile.name)
                self.assertEqual((temporary/'SOUL.md').read_text(),'Sales Academy identity')
                (temporary/'state.db').write_text('synthetic temporary state')
                if should_timeout:
                    raise subprocess.TimeoutExpired('worker',32)
                return SimpleNamespace(returncode=0,stdout=json.dumps({'reply':'Ready'}),stderr='')
            if should_timeout:
                with self.assertRaises(self.module.BridgeError):self.module.run_isolated(self.messages,runner=runner)
            else:self.module.run_isolated(self.messages,runner=runner)
            self.assertFalse(observed['home'].exists(),'Temporary profile survives request completion')
            self.assertFalse(Path(self.profile.name,'state.db').exists(),'Permanent profile was mutated')

    def test_agent_is_ephemeral_and_tool_free(self):
        worker_path=SOURCE.with_name('worker.py')
        self.assertTrue(worker_path.is_file())
        spec=importlib.util.spec_from_file_location('advisor_worker',worker_path)
        worker=importlib.util.module_from_spec(spec);spec.loader.exec_module(worker)
        kwargs=worker.agent_options('approved system',{'model':'fake','provider':'fake'})
        for name in ['skip_memory','skip_context_files','skip_background_review','quiet_mode']:
            self.assertTrue(kwargs[name])
        self.assertEqual(kwargs['enabled_toolsets'],[])
        for name in ['save_trajectories','verbose_logging','checkpoints_enabled']:
            self.assertFalse(kwargs[name])
        self.assertIsNone(kwargs['session_db'])
        self.assertEqual(kwargs['max_iterations'],1)
        self.assertLessEqual(kwargs['max_tokens'],1200)
        self.assertEqual(kwargs['ephemeral_system_prompt'],'approved system')

class ProviderExportTests(unittest.TestCase):
    def test_export_strips_refresh_tokens_and_unrelated_keys(self):
        source=SOURCE.with_name('refresh_provider.py')
        self.assertTrue(source.is_file(),'The credential export must minimize the public runtime')
        spec=importlib.util.spec_from_file_location('refresh_provider',source)
        module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
        result=module.minimal_runtime({'api_key':'synthetic-access','refresh_token':'never-copy','credential_pool':object(),'base_url':'https://chatgpt.com/backend-api/codex','provider':'openai-codex','api_mode':'codex_responses'},'gpt-6-astra')
        self.assertEqual(set(result),{'api_key','base_url','provider','api_mode','model'})
        self.assertNotIn('never-copy',json.dumps(result))


if __name__ == '__main__':
    unittest.main()
