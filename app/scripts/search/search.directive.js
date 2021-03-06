bulletApp.directive('searchBar', function(currentStates, $state, $log, $filter) {
    return {
        restrict: 'E',
        templateUrl: 'scripts/search/search.template.html',
        link: function(scope, element) {
            let fetched;

            scope.getBullets = function(search) {
                if (fetched) return fetched.filter(b => b.content.includes(search));
                return Bullet.fetchWithCollections(search)
                    .then(b => {
                        fetched = b;
                        return fetched;
                    }); 
            }

            scope.go = function(item) {
                if (item.collections.length) {
                    let collection = item.collections[0];
                    if (collection.type==='generic') $state.go('generic', {id: collection.id});
                    else $state.go($filter('stateName')(collection.type), { search: collection.title })
                }
                else $state.go('index');
                fetched = null;
                scope.select = null;
            }

            element.on('keydown', function(e) {
                if (e.which===27 || e.which===8) {
                    fetched = null;
                }
            })

        }
    };
});
