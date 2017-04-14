package controllers

import (
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

// App returns the fontend app
func App(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	public := os.Getenv("POPA_PUBLIC_DIR")
	http.ServeFile(w, r, public+"/index.html")
}
