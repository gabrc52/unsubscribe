Receiving emails is done with SIPB's Scripts service, specifically Mail Scripts.

This service is what Gabriel has been using for the Swipes Discord server.

Specifically, whenever a new free food email is received, it is sent to the backend through the `POST /api/receive_email` API call.

A shared secret in `.env` is used to make sure no one can just send fake emails to the backend.
