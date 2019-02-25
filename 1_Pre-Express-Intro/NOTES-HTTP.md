## HTTP - HyperText Transport Protocol

- Based on TCP
- Transports more than just HTML
  - images, css, video, js files, etc
- Very efficient
  - Only connected when required
- STATELESS
  - No dialogue

---

## HTTP MESSAGES

- Consist of:
  - Start Line (describes the type of message)
  - Headers / meta data (specifies the request OR describes the body)
    - `key: value` pairs
  - **always a blank line here**
  - Body - the content

---

### `REQUEST`
| SECTION    | EXAMPLE                           | DESCRIPTION              |
| ---------- | --------------------------------- | ------------------------ |
| Start Line | GET /blog HTTP/1.1                | Method / Path / Protocol |
| Headers    | "Host": "www.website.com"         | the baseURL              |
| Blank Line |                                   |                          |
| Body       | (Request doesn't always send one) |                          |
---
---

### `RESPONSE`
| SECTION    | EXAMPLE                     | DESCRIPTION                      |
| ---------- | --------------------------- | -------------------------------- |
| Start Line | HTTP/1.1 200 OK             | Protocol / Status Code / Message |
| Headers    | "Content-Type": "text/html" | Type of data being sent back     |
| Blank Line |                             |                                  |
| Body       | <!doctype html><html...>    | The HTML string                  |