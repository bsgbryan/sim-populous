(function(){angular.module("simgame",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ui.bootstrap"])}).call(this),function(){var e,l,i,a,o;e={residential:4,commercial:7,industrial:7},o={residential:2,commercial:4,industrial:3},i={commercial:1e3,industrial:500},a=.1,l=0,angular.module("simgame").controller("MainController",["$scope","$interval",function(n,r){var t,s,c,d,u,f,m;for(n.creating={residential:!1,commercial:!1,industrial:!1,education:!1,"public":!1},n.employed={commercial:0,industrial:0},n.citizens=0,n.money=0,n.months=0,n.floors=[],t=function(){var e;return e=n.floors[0],e.length<o[n.mode]?e.push(1):n.floors.unshift([1])},f=function(){var e;return e=n.floors[0],1===e.length?n.floors.shift():e.shift()},n.display_plus=function(l,i){return n.floors.length<e[n.mode]&&0===l&&++i===n.floors[0].length},n.display_minus=function(l,i){return null!=n.floors[l]?n.floors.length===e[n.mode]||0===l&&i===n.floors[0].length-2||l>0&&++i===n.floors[l].length:void 0},n.display_mutator=function(l,i){return 0===l?!0:n.floors.length<e[n.mode]?++i===n.floors[l].length&&1===n.floors[--l].length:l===e[n.mode]},n.toggle_bedroom=function(l,i){var a,o;return a=n.floors[n.floors.length-1],o=n.floors[l].length,0===l?i===o-1&&n.floors.length<e[n.mode]?t():f():i===o-1?f():void 0},n.random_reverse=function(e){return Math.random()>.5?e.reverse():e},n.toggleCreator=function(e){var l,i,a;n.mode=e,i=n.creating;for(l in i)a=i[l],l===e?n.creating[e]=!n.creating[e]:n.creating[l]=!1;return"residential"===e?n.floors=[[1,1]]:"commercial"===e?n.floors=[[1,1,1,1]]:"industrial"===e?n.floors=[[1,1,1]]:void 0},n.create_industrial_tile=function(){var e,l;return e={},l=0,n.floors.forEach(function(e){return l+=e.length}),e.jobs=l,e.available=e.jobs,e.decay=Math.ceil(e.jobs/4),e.type="industrial",console.log("industrial",e),e},n.create_commercial_tile=function(){var e,i;return e={},i=0,n.floors.forEach(function(e){return i+=e.length}),l+=.75*i,e.jobs=i,e.available=e.jobs,e.decay=Math.ceil(e.jobs/4),e.type="commercial",console.log("commercial",e),e},n.create_residential_tile=function(){var e,i;return e={},i=0,n.floors.forEach(function(e){return i+=e.length}),1===n.floors[0].length&&(i+=1),l+=1.5*i,e.people=i,e.employed=0,e.type="residential",e},n.processors={residential:function(e,i){var a,o,r;return("commercial"===i.type||"industrial"===i.type)&&(r=e.people-e.employed,r=e.decay>r?r:e.decay,r>0&&i.available>0)?(o=i.available>r?i.available:r,a=Math.round(o>r?r:o),e.employed+=a,i.available-=a,n.employed[i.type]+=a,l+="commercial"===i.type?2*a:3.5*a):void 0}},r(function(){var e,o,r,t,s,c,d,u,f,m,g,b,p;for(12===++n.months&&(o=n.employed.commercial*i.commercial,o+=n.employed.industrial*i.industrial,o-=l,n.money+=o*a,n.months=0),f=n.grid,m=[],s=d=0,u=f.length;u>d;s=++d)g=f[s],m.push(function(){var l,i,a,o,d,u,f;for(d=[],c=i=0,l=g.length;l>i;c=++i)e=g[c],p=function(){u=[];for(var e=a=s-3,l=s+3;l>=a?l>=e:e>=l;l>=a?e++:e--)u.push(e);return u}.apply(this),t=function(){f=[];for(var e=o=c-3,l=c+3;l>=o?l>=e:e>=l;l>=o?e++:e--)f.push(e);return f}.apply(this),d.push(null!=e.type?function(){var l,i,a,o;for(a=n.random_reverse(p),o=[],i=0,l=a.length;l>i;i++)b=a[i],o.push(function(){var l,i,a,o,s,c;for(i=n.random_reverse(t),s=[],c=0,l=i.length;l>c;c++)r=i[c],s.push(null!=(null!=(a=n.grid[b])&&null!=(o=a[r])?o.type:void 0)?e.x!==b||e.y!==r?b>=0&&r>=0&&null!=n.processors[e.type]?n.processors[e.type](e,n.grid[b][r]):void 0:void 0:void 0);return s}());return o}():void 0);return d}());return m},5e3),n.toggle=function(e,l){var i,a,o,r,t,s,c,d,u,f,m,g,b,p,v,h,x,y,_,$;i=n["create_"+n.mode+"_tile"]();for(m in i)r=i[m],n.grid[e][l][m]=r;if(null!=i.people&&(n.citizens+=i.people),n.grid[e][l].x=e,n.grid[e][l].y=l,null!=i.decay){for(x=i.decay,$=function(){p=[];for(var l=g=e-x,i=e+x;i>=g?i>=l:l>=i;i>=g?l++:l--)p.push(l);return p}.apply(this),s=function(){v=[];for(var e=b=l-x,i=l+x;i>=b?i>=e:e>=i;i>=b?e++:e--)v.push(e);return v}.apply(this),h=[],c=f=0,u=$.length;u>f;c=++f)_=$[c],a=Math.abs(c-x),h.push(function(){var e,l,i,r;for(r=[],d=l=0,e=s.length;e>l;d=++l)t=s[d],o=Math.abs(d-x),a===x||o===x?y=1:0===a&&0===o||1===a&&0===o||0===a&&1===o?y=x:0===a||0===o?y=0===a?o:a:a>o?y=a/o:o>a?y=o/a:a===o&&(y=1===a&&1===o?x:a),r.push(null!=(null!=(i=n.grid[_])?i[t]:void 0)?null!=n.grid[_][t].decay?n.grid[_][t].decay+=y:n.grid[_][t].decay=y:void 0);return r}());return h}},n.grid=[],m=[],s=c=0;50>=c;s=++c)n.grid.push([]),d=n.grid.length-1,m.push(function(){var e,l;for(l=[],u=e=0;50>=e;u=++e)l.push(n.grid[d].push({}));return l}());return m}])}.call(this),function(){angular.module("simgame").directive("unit",function(){return{require:"ngModel",link:function(e,l,i,a){return a.$validators.integer=function(l,i){if(console.log("modelValue",l,"viewValue",i),"multi"===e.residential_creator.mode){if(parseInt(l)>0&&parseInt(l)<=4)return!0;parseInt(l)<0?e.residential_creator.units=0:parseInt(l)>=4&&(e.residential_creator.units=4)}else if("apartment"===e.residential_creator.mode){if(parseInt(l)>0&&parseInt(l)<=200)return!0;parseInt(l)<0?e.residential_creator.units=0:parseInt(l)>200&&(e.residential_creator.units=200)}else if("single"===e.residential_creator.mode){if(1===parseInt(l))return!0;e.residential_creator.units=1}return!1}}}})}.call(this),function(){angular.module("simgame").run(["$log",function(e){return e.debug("runBlock end")}])}.call(this),function(){angular.module("simgame").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,l,i){return e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),i.html5Mode(!0),l.otherwise("/")}])}.call(this),function(){angular.module("simgame").constant("moment",moment)}.call(this),function(){angular.module("simgame").config(["$logProvider",function(e){return e.debugEnabled(!0)}])}.call(this),angular.module("simgame").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container-fluid"><div class="row"><div class="menu col-md-3"><h1 class="col-xs-12">SimPopulous</h1><div class="stats col-xs-12 col-mg-6 col-lg-4"><i class="fa fa-usd"></i><em>{{ money | number:2 }}</em></div><div class="stats col-xs-12 col-mg-6 col-lg-4"><i class="fa fa-group"></i><em>{{ citizens | number }}</em></div><div class="stats col-xs-12 col-mg-6 col-lg-4"><i class="fa fa-coffee"></i><em>{{ employed | number }}</em></div><div class="tiles col-xs-12"><div ng-click="toggleCreator(\'residential\')" class="tile residential"><i class="fa fa-home fa-2x"></i></div><div ng-click="toggleCreator(\'commercial\')" class="tile commercial"><i class="fa fa-building fa-2x"></i></div><div ng-click="toggleCreator(\'industrial\')" class="tile industrial"><i class="fa fa-industry fa-2x"></i></div><div ng-click="toggleCreator(\'education\')" class="tile education"><i class="fa fa-graduation-cap fa-2x"></i></div><div ng-click="toggleCreator(\'public\')" class="tile public"><i class="fa fa-institution fa-2x"></i></div></div><div class="creators col-xs-12"><div ng-submit="createResidentialTile()" ng-if="creating.residential" class="residential"><h3>Residential</h3><div class="unit-details col-xs-12"><div class="col-xs-8 col-xs-offset-2"><div class="single-house-top fa fa-home fa-5x"></div><div ng-repeat="floor in floors track by $index" ng-init="floor_index = $index" class="beds"><a ng-repeat="bed in floor track by $index" ng-class="{ standard: floor.length == 2, master: floor.length == 1 }" ng-click="toggle_bedroom(floor_index, $index)" class="bed btn btn-default"><i class="fa fa-bed"></i><i ng-class="{ \'fa-plus\': display_plus(floor_index, $index), \'fa-minus\': display_minus(floor_index, $index) }" ng-if="display_mutator(floor_index, $index)" class="fa"></i></a></div><div class="single-house-bottom fa fa-home fa-5x"></div></div><div class="form-group col-xs-12"><label class="control-label col-xs-6">Cost</label><div class="col-xs-6"><p class="form-control-static">${{ cost | number:2 }}</p></div></div></div></div><div ng-submit="createCommercialTile()" ng-if="creating.commercial" class="commercial"><h3>Commercial</h3><div class="office-complex-top fa fa-building fa-5x"></div><div ng-repeat="floor in floors track by $index" ng-init="floor_index = $index" class="floor"><a ng-repeat="desk in floor track by $index" ng-class="{ standard: floor.length == 2, master: floor.length == 1 }" ng-click="toggle_bedroom(floor_index, $index)" class="office btn btn-default"><i ng-class="{ \'fa-plus\': display_plus(floor_index, $index), \'fa-minus\': display_minus(floor_index, $index) }" ng-if="display_mutator(floor_index, $index)" class="fa"></i></a></div><div class="office-complex-bottom fa fa-building fa-5x"></div></div><div ng-submit="createIndustrialTile()" ng-if="creating.industrial" class="industrial col-xs-12"><h3>Industrial</h3><div class="manufacturing-plant-top fa fa-industry fa-5x"></div><div ng-repeat="floor in floors track by $index" ng-init="floor_index = $index" class="line"><a ng-repeat="desk in floor track by $index" ng-class="{ standard: floor.length == 2, master: floor.length == 1 }" ng-click="toggle_bedroom(floor_index, $index)" class="worker btn btn-default"><i class="fa fa-wrench"></i><i ng-class="{ \'fa-plus\': display_plus(floor_index, $index), \'fa-minus\': display_minus(floor_index, $index) }" ng-if="display_mutator(floor_index, $index)" class="fa"></i></a></div><div class="manufacturing-plant-bottom fa fa-industry fa-5x"></div></div><form ng-submit="createEducationTile()" ng-if="creating.education" class="form-horizontal education"><h3>Education</h3><div role="group" aria-label="Education options" class="col-xs-10 col-xs-offset-1 form-group btn-group-vertical"><label ng-model="education_creator.mode" btn-radio="\'elementary\'" uncheckable="" class="btn btn-default">Elementary school</label> <label ng-model="education_creator.mode" btn-radio="\'middle\'" uncheckable="" class="btn btn-default">Middle school</label> <label ng-model="education_creator.mode" btn-radio="\'high\'" uncheckable="" class="btn btn-default">High school</label> <label ng-model="education_creator.mode" btn-radio="\'college\'" uncheckable="" class="btn btn-default">College</label> <label ng-model="education_creator.mode" btn-radio="\'university\'" uncheckable="" class="btn btn-default">University</label></div><button type="submit" class="btn btn-success">Create</button></form><form ng-submit="createPublicTile()" ng-if="creating.public" class="form-horizontal education"><h3>Public</h3><div role="group" aria-label="Public options" class="col-xs-10 col-xs-offset-1 form-group btn-group-vertical"><label ng-model="public_creator.mode" btn-radio="\'firehouse\'" uncheckable="" class="btn btn-default">Firehouse</label> <label ng-model="public_creator.mode" btn-radio="\'police-station\'" uncheckable="" class="btn btn-default">Police station</label> <label ng-model="public_creator.mode" btn-radio="\'hospital\'" uncheckable="" class="btn btn-default">Hospital</label> <label ng-model="public_creator.mode" btn-radio="\'park\'" uncheckable="" class="btn btn-default">Park</label></div><button type="submit" class="btn btn-success">Create</button></form></div></div><div class="game-board col-md-9"><div class="grid"><div ng-repeat="col in grid" class="line"><div ng-repeat="r in col" ng-click="toggle($parent.$index, $index)" class="tile {{ r.type }} {{ r.level }}"></div></div></div></div></div></div>')}]);