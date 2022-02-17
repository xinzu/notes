(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{407:function(t,n,e){"use strict";e.r(n);var a=e(56),r=Object(a.a)({},(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"消息-1字头"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#消息-1字头"}},[t._v("#")]),t._v(" 消息（1字头）")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v("100 Continue \n\t客户端应当继续发送请求。 \n\tExcept:100-continue 如果服务器满足期望则继续，不满足则返回417\n101 Switching Protocols 切换协议\n\t服务器切换协议，服务器已经理解了客户端的请求，并将通过Upgrade 消息头通知客户端采用更高级的协议来完成这个请求。 \n\t比如：在使用 WebSockets 时会用到协议切换\n102 Processing 由WebDAV（RFC 2518）扩展的状态码，代表处理将被继续执行。 \n")])])]),e("h2",{attrs:{id:"成功-2字头"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#成功-2字头"}},[t._v("#")]),t._v(" 成功（2字头）")]),t._v(" "),e("p",[t._v("这一类型的状态码，代表请求已成功被服务器接收、理解、并接受。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v("200 OK \n\t请求已成功，请求所希望的响应头或数据体将随此响应返回。 \n201 Created \n\t请求已经被实现，而且有一个新的资源已经依据请求的需要而建立，且其 URI 已经随Location 头信息返回。假如需要的资源无法及时建立的话，应当返回 '202 Accepted'。 \n202 Accepted \n\t服务器已接受请求，但尚未处理。最终该请求可能会也可能不会被执行，因为中途可能会被打断。 \n203 Non-Authoritative Information 非权威的信息\n \t服务器已成功处理了请求，但返回的实体头部元信息可能来自其他源。 \n204 No Content 无内容\n\t服务器成功处理了请求，但没有返回任何实体内容，并且希望返回更新了的元信息。 由于204响应被禁止包含任何消息体，因此它始终以消息头后的第一个空行结尾。 \n205 Reset Content 重置内容\n\t服务器成功处理了请求，且没有返回任何内容。但是与204响应不同，返回此状态码的响应要求请求者重置文档视图。 \n206 Partial Content 部分内容\n\t服务器已经成功处理了部分 GET 请求。 \n\t对应请求的Range 首部\n\t如果只包含一个数据区间，那么整个响应的 Content-Type 首部的值为所请求的文件的类型，同时包含  Content-Range 首部。\n\t如果包含多个数据区间，那么整个响应的  Content-Type  首部的值为 multipart/byteranges ，其中一个片段对应一个数据区间，可有多个  Content-Range  和  Content-Type  描述信息。\n")])])]),e("h2",{attrs:{id:"重定向-3字头"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重定向-3字头"}},[t._v("#")]),t._v(" 重定向（3字头）")]),t._v(" "),e("p",[t._v("这类状态码代表需要客户端采取进一步的操作才能完成请求。通常，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的 Location 域中指明。 按照 HTTP/1.0 版规范的建议，浏览器不应自动访问超过5次的重定向。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v("300 Multiple Choices 多重选择\n\t被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向。\n301 Moved Permanently 永久移动\n\t被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。 \n302 Move temporarily 临时移动\n\t请求的资源临时从不同的 URI响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。 \n\t302状态码的实现其实就是对303状态码的响应\n\t推荐仅在响应 GET 或 HEAD 方法时采用 302 状态码，而在其他时候使用 307 Temporary Redirect 来替代，因为在这些场景下方法变换是明确禁止的。\n303 See Other \n\t当前请求的响应能够在其它的URI地址上使用GET方法发现。当接收到一个POST响应的请求，则应该假设服务器已经收到数据而且跳转应该发出一个单独的GET消息\n\t这个方法的存在主要是为了允许由脚本激活的POST请求输出重定向到一个新的资源。这个新的 URI 不是原始资源的替代引用。同时，303响应禁止被缓存。当然，第二个请求（重定向）可能被缓存。 \n304 Not Modified 未修改\n\tHTTP 304 未改变说明无需再次传输请求的内容，也就是说可以使用缓存的内容。这通常是在一些安全的方法（safe），如果客户端发送了一个带条件的 GET 请求且该请求已被允许\n305 Use Proxy 使用代理（自从HTTP/1.1）\n\t被请求的资源必须通过指定的代理才能被访问。 \n307 Temporary Redirect 临时重定向\n\t请求的资源临时从不同的URI 响应请求。 \n\thttp://跳转到https:// 就是307重定向\n\t307不允许更改请求方法 POST 至 GET，302是可以的\n\t状态码 307 与 302 之间的唯一区别在于，当发送重定向请求的时候，307 状态码可以确保请求方法和消息主体不会发生变化。当响应状态码为 302 的时候，一些旧有的用户代理会错误地将请求方法转换为 GET：使用非 GET 请求方法而返回 302 状态码，Web 应用的运行状况是不可预测的；而返回 307 状态码时则是可预测的。对于 GET 请求来说，两种情况没有区别。\n308 Permanent Redirect 永久重定向\n\t308不允许更改请求方法 POST 至 GET，301可以。\n")])])]),e("h2",{attrs:{id:"请求错误-4字头"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#请求错误-4字头"}},[t._v("#")]),t._v(" 请求错误（4字头）")]),t._v(" "),e("p",[t._v("这类的状态码代表了客户端看起来可能发生了错误，妨碍了服务器的处理。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v("400 Bad Request \n\t1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。 \n\t2、请求参数有误。 \n401 Unauthorized \n\t当前请求需要用户验证。 \n\t这个状态码会与 WWW-Authenticate 首部一起发送，其中包含有如何进行验证的信息。\n\t这个状态类似于 403， 但是在该情况下，依然可以进行身份验证。\n402 Payment Required \n\t该状态码是为了将来可能的需求而预留的。 \n403 Forbidden 拒绝授权访问\n\t服务器已经理解请求，但是拒绝执行它。与401响应不同的是，身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交。 \n\t被永久禁止。\n404 Not Found \n\t请求失败，请求所希望得到的资源未被在服务器上发现。 \n405 Method Not Allowed \n\t请求行中指定的请求方法不能被用于请求相应的资源。 \n\tGET 与 HEAD 两个方法不得被禁止，当然也不得返回状态码 405。\n406 Not Acceptable \n\t请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体。 \n\t**极少使用**\n407 Proxy Authentication Required \n\t与401响应类似，只不过客户端必须在**代理服务器**上进行身份验证。 \n408 Request Timeout \n\t表示服务器想要将没有在使用的连接关闭。一些服务器会在空闲连接上发送此信息，即便是在客户端没有发送任何请求的情况下。\n\t**某些服务器会直接关闭连接，而不发送此类消息。**\n409 Conflict \n\t由于和被请求的资源的当前状态之间存在冲突，请求无法完成。\n\t这个代码只允许用在这样的情况下才能被使用：用户被认为能够解决冲突，并且会重新提交新的请求。该响应应当包含足够的信息以便用户发现冲突的源头。 \n410 Gone 丢失\n\t被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址。这样的状况应当被认为是永久性的。 \n411 Length Required \n\t由于缺少确定的Content-Length 首部字段，服务器拒绝客户端的请求。\n\t按照规范，当使用分块模式传输数据的时候， Content-Length 首部是不存在的，但是需要在每一个分块的开始添加该分块的长度，用十六进制数字表示。\n412 Precondition Failed 先决条件失败\n\t对于目标资源的访问请求被拒绝。这通常发生于采用除 GET 和 HEAD 之外的方法进行条件请求时，由首部字段 If-Unmodified-Since 或 If-None-Match 规定的先决条件不成立的情况下。这时候，请求的操作——通常是上传或修改文件——无法执行，从而返回该错误状态码。 \n413 Request Entity Too Large \n\t表示请求主体的大小超过了服务器愿意或有能力处理的限度，服务器可能会（may）关闭连接以防止客户端继续发送该请求。\n\t如果“超出限度”是暂时性的，服务器应该返回  Retry-After 首部字段，说明这是暂时性的，以及客户端可以在什么时间（after what time）后重试\n414 Request-URI Too Long \n\t表示客户端所请求的 URI 超过了服务器允许的范围。\n\t以下是造成这种罕见情况的几种可能原因：\n\t1. 当客户端误将 POST 请求当作 GET 请求时，会带有一个较长的查询字符串(query)；\n\t2. 当客户端堕入重定向循环黑洞时，例如，指向自身后缀的重定向URI前缀(a redirected URI prefix that points to a suffix of itself)；\n\t3. 当客户端对服务器进行攻击，试图寻找潜在的漏洞时。 \n415 Unsupported Media Type HTTP协议的错误状态\n\t对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝。 \n\t格式问题的出现有可能源于客户端在 Content-Type 或 Content-Encoding 首部中指定的格式，也可能源于直接对负载数据进行检测的结果。\n416 Requested Range Not Satisfiable \n\t服务器无法处理所请求的数据区间。最常见的情况是所请求的数据区间不在文件范围之内，也就是说，Range 首部的值，虽然从语法上来说是没问题的，但是从语义上来说却没有意义。\n\t416 响应报文包含一个  Content-Range 首部，提示无法满足的数据区间（用星号 * 表示），后面紧跟着一个“/”，再后面是当前资源的长度。例如：Content-Range: */12777\n\t遇到这一错误状态码时，浏览器一般有两种策略：要么终止操作（例如，一项中断的下载操作被认为是不可恢复的），要么再次请求**整个文件。** \n417 Expectation Failed \n\t在请求头 Expect 中指定的预期内容无法被服务器满足，或者这个服务器是一个代理服务器，它有明显的证据证明在当前路由的下一个节点上，Expect 的内容无法被满足。 \n421 There are too many connections from your internet address \n\t从当前客户端所在的IP地址到服务器的连接数超过了服务器许可的最大范围。通常，这里的IP地址指的是从服务器上看到的客户端地址（比如用户的网关或者代理服务器地址）。 \n422 Unprocessable Entity \n\t请求格式正确，但是由于含有语义错误，无法响应。（RFC 4918 WebDAV） \n423 Locked \n\t当前资源被锁定。（RFC 4918 WebDAV） \n424 Failed Dependency \n\t由于之前的某个请求发生的错误，导致当前请求失败，例如 PROPPATCH。（RFC 4918 WebDAV） \n425\tToo Early\n\t服务器不愿意冒风险来处理该请求，原因是处理该请求可能会被“重放”，从而造成潜在的重放攻击\n426 Upgrade Required \n\t表示服务器拒绝处理客户端使用当前协议发送的请求，但是可以接受其使用升级后的协议发送的请求。\n\t服务器会在响应中使用 Upgrade 首部来指定要求的协议。\n428 Precondition Required\n\t表示服务器端要求发送条件请求。\n\t一般的，这种情况意味着必要的条件首部——如 If-Match ——的缺失。.\n")])])]),e("h2",{attrs:{id:"服务器错误-5、6字头"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#服务器错误-5、6字头"}},[t._v("#")]),t._v(" 服务器错误（5、6字头）")]),t._v(" "),e("p",[t._v("这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理。除非这是一个HEAD 请求，否则服务器应当包含一个解释当前错误状态以及这个状况是临时的还是永久的解释信息实体。浏览器应当向用户展示任何在当前响应中被包含的实体。 这些状态码适用于任何响应方法。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v("500 Internal Server Error \n\t服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器端的源代码出现错误时出现。 \n\t有一种特殊情况：客户端的传值有问题（比如某个值没有按照服务器处理格式传，但是满足请求格式），导致在服务器处理时出错。\n501 Not Implemented \n\t服务器不支持当前请求所需要的某个功能。当服务器无法识别请求的方法，并且无法支持其对任何资源的请求。 \n\t服务器必须支持的方法（即不会返回这个状态码的方法）只有 GET 和 HEAD。\n\t请注意，你无法修复 501 错误，需要被访问的 web 服务器去修复该问题。\n502 Bad Gateway \n\t作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。 \n503 Service Unavailable \n\t由于临时的服务器维护或者过载，服务器当前无法处理请求。\n\t这个状况是临时的，并且将在一段时间以后恢复。如果能够预计延迟时间，那么响应中可以包含一个 Retry-After 头用以标明这个延迟时间。如果没有给出这个 Retry-After 信息，那么客户端应当以处理500响应的方式处理它。 \n\t注意：503状态码的存在并不意味着服务器在过载的时候必须使用它。某些服务器只不过是希望拒绝客户端的连接。 \n504 Gateway Timeout \n\t作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应。 \n\t注意：某些代理服务器在DNS查询超时时会返回400或者500错误 \n505 HTTP Version Not Supported \n\t服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本。\n\t这暗示着服务器不能或不愿使用与客户端相同的版本。响应中应当包含一个描述了为何版本不被支持以及服务器支持哪些协议的实体。 \n507 Insufficient Storage \n\t服务器无法存储完成请求所必须的内容。这个状况被认为是临时的。WebDAV (RFC 4918) \n509 Bandwidth Limit Exceeded \n\t服务器达到带宽限制。这不是一个官方的状态码，但是仍被广泛使用。 \n510 Not Extended \n\t获取资源所需要的策略并没有没满足。（RFC 2774） \n600 Unparseable Response Headers \n\t源站没有返回响应头部，只返回实体内容")])])])])}),[],!1,null,null,null);n.default=r.exports}}]);