# ADR-001 · Perfil público y adaptador aislados
Estado: aceptado como decisión de implementación del plan aprobado.

El Copiloto operativo exige sesión y no se abre a visitantes. Se crea perfil Hermes propio y servicio restringido, accedido desde servidor V5; el navegador jamás recibe claves. Estado conversacional por visitante en backend con TTL, conocimiento derivado de CMS publicado; memoria global y herramientas generales deshabilitadas. Solo el servicio editorial registra solicitudes consentidas y produce enlaces revisables. No se añaden acciones autónomas de mensajería ni reservas. Esto evita cruzar información operativa y permite limitar gasto/concurrencia con cambios reversibles.
