package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/hart/constellation/api/db"
	"github.com/johnhof/popa/server/server"
)

func verifyEnvVar(s string) {
	if os.Getenv(s) == "" {
		panic("environment vaiable " + s + " must be set")
	}
}

func init() {
	verifyEnvVar("POPA_VERSION")
	verifyEnvVar("POPA_SERVER_PORT")

	verifyEnvVar("POPA_PUBLIC_PREFIX")
	verifyEnvVar("POPA_PUBLIC_DIR")

	verifyEnvVar("POPA_LOG_ASSETS")

	db.Init()
}

func main() {
	port := os.Getenv("POPA_SERVER_PORT")
	if port == "" {
		port = "1991"
	}
	router := server.GetRouter()
	app := server.WrapMiddleware(router)
	fmt.Println("Server listening on port: " + port + "\n")
	http.ListenAndServe(":"+port, app)
}
