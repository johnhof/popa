package response

// NotFound returns a 404 response with a custom message, defaulting to "Not found"
func NotFound(message string) *Response {
	if message == "" {
		message = "Not found"
	}
	var i interface{}
	return New(404, message, i)
}

// Ok returns a 200 response with data and a custom message, defaulting to "OK"
func Ok(message string, data interface{}) *Response {
	if message == "" {
		message = "OK"
	}
	return New(200, message, data)
}
