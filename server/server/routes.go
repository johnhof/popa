package server

import (
	"net/http"

	"github.com/johnhof/popa/server/controllers"
	"github.com/johnhof/popa/server/response"
	"github.com/julienschmidt/httprouter"
)

// GetRouter returns the compiled handlers and routes
func GetRouter() *httprouter.Router {
	router := httprouter.New()
	router.HandleMethodNotAllowed = false
	router.RedirectTrailingSlash = false

	// TODO: replace with webpack
	// // App service
	// publicPre := os.Getenv("POPA_PUBLIC_PREFIX")
	// publicDir := os.Getenv("POPA_PUBLIC_DIR")
	// router.GET("/", controllers.App)
	// router.ServeFiles("/"+publicPre+"/*filepath", http.Dir(publicDir))

	// API service
	router.GET("/status", controllers.Status)

	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		response.NotFound("").Write(w)
	})

	return router
}
