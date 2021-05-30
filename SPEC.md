# Technical Spec

API that computers facts about a number.


## MVP

You send a number in and get a `201 created` with an ID. Then, you can
use that ID to get back information on that number.

Information in this context is defined to mean:

  * `id`: unique identifier of the number
  * `number`: what you sent
  * `prime`: bool
  * `squared`: `number` squared
  * `cubed`: `number` cubed


Two API endpoints

  * `POST` /api/v1/number
    * return the `id` with `201` if created
    * return status code of 400 if a non-number is passed

  * `GET` /api/v1/number
    * return 404 error with message "not found"
    * return `202` if still processing
    * return `200` with content if done


To Consider

  * too large a number when cubing?


Other notes

  * 422 is not a real thing so its best to avoid (`unprocessable
    type`)
