package server

import (
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"

	"github.com/justinas/alice"
)

// WrapMiddleware wraps the http handler with middleware and returns the result
func WrapMiddleware(h http.Handler) http.Handler {
	return alice.New(trimTrailingSlash, stripVersion, reqLogger).Then(h)
}

//
// Middleware
//

func trimTrailingSlash(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			r.URL.Path = strings.TrimSuffix(r.URL.Path, "/")
		}
		h.ServeHTTP(w, r)
	})
}

func reqLogger(h http.Handler) http.Handler {
	publicPre := os.Getenv("POPA_PUBLIC_PREFIX")
	assetRegex, _ := regexp.Compile("^/(" + publicPre + "|favicon)")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logAssets, _ := strconv.ParseBool(os.Getenv("POPA_LOG_ASSETS"))
		if logAssets {
			fmt.Println(r.Method + " " + r.URL.Path)
		} else if !assetRegex.Match([]byte(r.URL.Path)) {
			fmt.Println(r.Method + " " + r.URL.Path)
		}
		h.ServeHTTP(w, r)
	})
}

func stripVersion(h http.Handler) http.Handler {
	version := os.Getenv("POPA_VERSION")
	versioning := strings.Split(version, ".")
	vMajor := versioning[0]
	vMinor := vMajor + "." + versioning[1]
	vPatch := vMinor + "." + versioning[2]
	prefixs := [6]string{
		"/" + vPatch, "/" + vMinor, "/" + vMajor,
		"/v" + vPatch, "/v" + vMinor, "/v" + vMajor,
	}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		for _, prefix := range prefixs {
			result := strings.TrimPrefix(r.URL.Path, prefix)
			if r.URL.Path != result {
				r.URL.Path = result
				break
			}
		}
		h.ServeHTTP(w, r)
	})
}

// Helpers
//

func hasOnePrefix(s string, prefixs ...string) bool {
	hasOne := false
	for _, prefix := range prefixs {
		if strings.HasPrefix(s, prefix) {
			hasOne = true
		}
	}
	return hasOne
}
