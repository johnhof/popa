package server

import (
	"net/http"
	"os"

	"github.com/johnhof/popa/api/controllers"
	"github.com/johnhof/popa/api/response"
	"github.com/julienschmidt/httprouter"
)

type notFoundHandler struct{}

func (h notFoundHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	response.NotFound("").Write(w)
}

// GetRouter returns the compiled handlers and routes
func GetRouter() *httprouter.Router {

	router := httprouter.New()
	router.HandleMethodNotAllowed = false
	router.RedirectTrailingSlash = false

	// App service
	publicPre := os.Getenv("CONSTELLATION_PUBLIC_PREFIX")
	publicDir := os.Getenv("CONSTELLATION_PUBLIC_DIR")
	router.GET("/", controllers.App)
	router.ServeFiles("/"+publicPre+"/*filepath", http.Dir(publicDir))

	// API service
	router.GET("/status", controllers.Status)

	router.NotFound = http.Handler(notFoundHandler{})

	return router
}
