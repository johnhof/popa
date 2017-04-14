package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/hart/constellation/api/db"
	"github.com/johnhof/popa/api/server"
)

func verifyEnvVar(s string) {
	if os.Getenv(s) == "" {
		panic("environment vaiable " + s + " must be set")
	}
}

func init() {
	verifyEnvVar("POPA_VERSION")
	verifyEnvVar("POPA_PORT")

	verifyEnvVar("POPA_PUBLIC_PREFIX")
	verifyEnvVar("POPA_PUBLIC_DIR")

	verifyEnvVar("POPA_LOG_ASSETS")

	db.Init()
}

func main() {
	fmt.Println(server.Banner)
	port := os.Getenv("CONTELLATION_PORT")
	if port == "" {
		port = "8080"
	}
	router := server.GetRouter()
	app := server.WrapMiddleware(router)
	fmt.Println(server.Banner)
	fmt.Println("Listening on port: " + port + "\n")
	http.ListenAndServe(":"+port, app)
}
