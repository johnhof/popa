
//
// Style markdown. handle linking. its ugly, but it works
//

popa.directive('markdown', ['$window', 'Utils', '$sce', '$compile', '$location', function ($window, Utils, $sce, $compile, $location) {
  return {
    restrict   : 'E',
    replace    : false,
    scope      : {
      content : '='
    },
    link       : function(scope, element, attrs) {
      scope.$watch('content', function () {
        if (scope.content) {
          var mdContent = '<div class="markdown-content">' + marked(scope.content) + '</div>';

          element.html(mdContent);

          //add prettyprint
          element.find('pre').addClass('prettyprint');

          // if there is a key, separate it
          //
          var $keyHeader = element.find('#key');
          if ($keyHeader.length) {
            element.addClass('has-key');
            var $keyList  = $keyHeader.next('ul').remove();

            $keyList.find('a code').each(function () {
              var $self = $(this);
              var text  = $self.text();

              text = text.replace(/(.+\.)(.+)\(.*\)/, '$1<span>$2</span>');

              $self.html(text);
              $self.closest('a').addClass('function');
            });

            var keyList   = $keyList.html() || '';
            var keyHeader = $keyHeader.remove().html() || '';
            var key       = '<div class="markdown-key" ng-show="expanded"><ul>' + keyList + '</ul></div>';

            element.prepend(key);
          }

          // add classes to doc cards
          if (attrs.documentation) {
            element.find('h3 code').closest('h3').each(function () {
              var $self = $(this);
              var $content = $self.nextUntil('h1, h2, h3');

              var content = '';
              $content.each(function () {
                var $this = $(this);
                content += $this.outerHtml();
              });

              $self.before('<div class="doc-function">' + $self.outerHtml() + content + '</div>');

              $self.remove();
              $content.remove();
            });
          }

          // sanitize a href's
          element.find('a[href*="#"]').each (function () {
            var $this = $(this);
            var id    = ($this.attr('href') || '').replace(/-/g, '');

            $this.attr('id', id);

            $this.on('click', function (e) {
              e.preventDefault();
              contentScroll(id);
            });
          });

          // sanitize ids for linking
          element.find('h1[id*="-"], h2[id*="-"], h3[id*="-"], h4[id*="-"]').each(function () {
            var $this = $(this);
            var id = ($this.attr('id') || '').replace(/-/g, '');
            $this.attr('id', id);
          });

          element.prepend('<div class="expand-key" ng-click="expandHanlder()"><sprite name="ion-navicon" size="16"></sprite></div>');

          function contentScroll (id) {
            if (!id) { return; }

            id = /^\#/.test(id) ? id : '#' + id

            var $content = element.find('.markdown-content');
console.log()
console.log(id)
            var $target  = $content.find(id);
console.log($target.length);
console.log($content.length)
console.log($keyHeader.length)
            if (!($target.length && ($content.length || !$keyHeader.length))) { return; }

            Utils.setHash(id);

            if (!$keyHeader.length || window.innerWidth < 768) {

console.log('wooo')
              $('body').animate({
                scrollTop: $target.offset().top - ($content.offset().top - $content.scrollTop()) - 20
              }, 0);
            } else {
console.log('nooo')
              $content.animate({
                scrollTop: $target.offset().top - ($content.offset().top - $content.scrollTop()) - 20
              }, 0);
            }
          }

          // key expansion on mobile
          //
          scope.expanded = window.innerWidth > 768;
          scope.expandHanlder = function () {
            if (window.innerWidth < 768) {
              scope.expanded = !scope.expanded;
            }
          }

          Utils.onResize(scope, function (newSize, oldSize, change) {
            if (newSize.displayType === 'desktop') {
              scope.expanded = true;
            } else if (change) {
              scope.expanded = false;
            }
          })

          // compile result
          //
          scope.scrollTo = Utils.scrollTo;
          $compile(element.contents())(scope);

          prettyPrint();
          if ($location.hash()) {
            contentScroll($location.hash())
          }
        }
      });
    }
  };
}]);
