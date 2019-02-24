## PACKETS

- Data exists in the form of `Packets` and is transferred across the internet in
  `Packets`
- There are **5 Layers** to the structure / makeup of every `Packet`

| LAYER              | EXAMPLE                 |
| ------------------ | ----------------------- |
| Application        | HTTP / FTP / SSH / SMTP |
| Transport          | TCP / UDP               |
| Network / Internet | IP                      |
| Link               | WiFi / Ethernet         |
| Physical           | cables                  |

- The `Transport` and `Network` layers together form the `Internet Protocol Suite` or `TCP/IP`
- `HTTP` uses `TCP`
- The `Transport` layer creates 2^16 (or ~65,000) `ports` on your computer
  - such as when you start a server on `localhost:3000`, port 3000
  - `HTTP` servers are usually on `port` 80
  - `HTTPS` usually on `port` 443

---

## UDP

- Lightweight
  - 8 bytes for a Header
- Connection-less
  - no handshake to begin connection
  - just start sending data
- Consistency
  - will send data no matter what
  - doesn't care about packet loss, or a congested network, or packets out of order, etc
- VERY FAST
- Used for video games or other real-time communication
- VERY UNRELIABLE

---

## TCP (Transmission Control Protocol)

- Connection-Based
- Requires a 3-way handshake to setup a connection before sending data
  - Client reaches out to server
  - Server confirms connection
  - Client begins sending data (starts with HTTP request)
- VERY RELIABLE
  - Delivery acknowledgment
  - Re-transmission if data wasn't received
  - In-order packet transmission
- Congestion control (purposefully introduce latency to prevent packet loss on a congested network)

---

## TCP/IP

- Together, they get two computers ready to talk to each other (create the communication environment)