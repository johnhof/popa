package controllers

import (
	"net/http"
	"os"

	"github.com/johnhof/popa/api/response"
	"github.com/julienschmidt/httprouter"
)

type stats struct {
	Status  string `json:"status"`
	Version string `json:"version"`
}

// Status calls out to dependencies to compile server status
func Status(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	version := os.Getenv("POPA_VERSION")
	response.Ok("", stats{"OK", version}).Write(w)
}
