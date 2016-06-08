var rulesApp = angular.module('rulesApp', []);

function aaa() {
    $('.bs-component [data-toggle="popover"]').popover();
    $('.bs-component [data-toggle="tooltip"]').tooltip();
    moment().calendar();
    $(".datepicker").datetimepicker({defaultDate: "now"});
    autosize($("textarea"));
    $('[id^="triggerTags"]').tagsinput({tagClass: "label label-default"});

    function activate() {
        $(this).closest("tr").toggleClass("inactive");
        if ($(this).closest("tr").find(".disabledControl").is(':disabled'))
            $(this).closest("tr").find(".disabledControl").prop('disabled', false);
        else
            $(this).closest("tr").find(".disabledControl").prop('disabled', true);

    }
    $(".rules-list h2").on("click", activate);
    $(".fa-pencil").on("click", activate);
    $(".rules-list .btn-save").on("click", activate);
    $('.trigger-start').on('focus', function(){
        $(this).addClass('datepicker');
        $(".datepicker").datetimepicker();
        $(this).blur();
        $(this).focus();
    });
    $('.trigger-end').on('focus', function(){
        $(this).addClass('datepicker');
        $(".datepicker").datetimepicker();
        $(this).blur();
        $(this).focus();
    });
}

rulesApp.controller('rulesController', function($scope, $http) {
    var vm = this;

    vm.query = "*";
    vm.facetField = "type";

    vm.solrUrl = "http://localhost:8764/api/apollo/solr";
    vm.rulesCollection = "bsb_products_rules";
    var c = { headers: { 'Authorization': 'Basic ' + btoa('admin:123qweasdzxc')}};

    function findIndexById(id) {
        for (var i = 0; i < $scope.rules.length; i++) {
            var r = $scope.rules[i];
            if (r.id == id) {
                return i;
            }
        }
        return null;
    }

    /*scope.currentDate = Date.now();
    $scope.ruleName = '';
    $scope.ruleDescription = '';

    $scope.ruleStart = '';
    $scope.ruleEnd = '';
    $scope.ruleKeywords = '';
    $scope.ruleCategory = '';
    $scope.ruleTagList = '';

    $scope.ruleProductList = '';
    $scope.ruleRedirect = '';
    $scope.ruleBanner = '';
    $scope.ruleFacetList = '';
    $scope.ruleRankList = '';
    $scope.ruleQuerySet = ''; */

    $scope.currentRule = {
        currentDate : Date.now(),
        ruleName : '',
        ruleDescription : '',
        ruleStart : '',
        ruleEnd : '',
        ruleKeywords : '',
        ruleCategory : '',
        ruleTagList : '',
        ruleProductList : '',
        ruleRedirect : '',
        ruleBanner : '',
        ruleFacetList : '',
        ruleRankList : '',
        ruleQuerySet : ''
    };

    $scope.addRule = function () {

        var rule = {
            id: $scope.currentRule.ruleName,
            description: $scope.currentRule.ruleDescription,
            triggerStart: document.getElementsByClassName('add-trigger-start')[0].value,
            triggerEnd: document.getElementsByClassName('add-trigger-end')[0].value,
            search_terms: $scope.currentRule.ruleKeywords,
            category: $scope.currentRule.ruleCategory,
            tagList: $scope.currentRule.ruleTagList,
            productList: $scope.currentRule.ruleProductList,
            redirect: $scope.currentRule.ruleRedirect,
            banner: $scope.currentRule.ruleBanner,
            facetList: $scope.currentRule.ruleFacetList,
            rankList: $scope.currentRule.ruleRankList,
            querySet: $scope.currentRule.ruleQuerySet,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            status: 'disabled'
        };

        $scope.rules = [rule].concat($scope.rules);

        if ($scope.rules[$scope.rules.length-1]==undefined)
                $scope.rules.pop();

        $http.post(vm.solrUrl + '/' + vm.rulesCollection + '/update/json/docs?commit=true', rule, c).then(function(response) {
            console.log("Rule '" + rule.id + "' created!");
        });
        setTimeout(aaa, 1000); // TODO all controls should be done as Angular directives
    };

    $scope.checkUncheckAll= function(){
        var masterBox = document.getElementById('selectAllBoxes');
        var checkboxes = document.getElementsByClassName('ruleCheckbox');
        if (masterBox.checked){
            for (var i = 0, l = checkboxes.length; i<l; i++)
                checkboxes[i].checked = true;
            $scope.checkedBoxesCount = checkboxes.length;
        } else {
            for (var i = 0, l = checkboxes.length; i<l; i++)
                checkboxes[i].checked = false;
            $scope.checkedBoxesCount = 0;
        }
    };

    $scope.removeRule = function (id) {
        console.log("delete - " + id);
        $scope.rules.splice(findIndexById(id), 1);

        $http.post(vm.solrUrl + '/' + vm.rulesCollection + '/update?commit=true', {'delete': {id: id}}, c).then(function(response) {
            console.log("Rule '" + id + "' deleted!");
        });
    };

    $scope.bulkRemoveRules = function(){
        var ruleArray = document.getElementsByClassName('ruleCheckbox');
        var masterBox = document.getElementById('selectAllBoxes');
        masterBox.checked = false;
        for (var i = 0, l = ruleArray.length; i<l; i++) {
            if (ruleArray[i].checked)
                $scope.removeRule(ruleArray[i].value);
        }
    };

    $scope.bulkStatusEnabled = function(){
        var ruleArray = document.getElementsByClassName('ruleCheckbox');
        for (var i = 0, l = ruleArray.length; i<l; i++) {
            if (ruleArray[i].checked) {
                var rule = $scope.rules[findIndexById(ruleArray[i].value)];
                rule.status = 'enabled';
                $scope.updateRule(ruleArray[i].value);
            }
        }
    };

    $scope.bulkStatusDisabled = function(){
        var ruleArray = document.getElementsByClassName('ruleCheckbox');
        for (var i = 0, l = ruleArray.length; i<l; i++) {
            if (ruleArray[i].checked) {
                var rule = $scope.rules[findIndexById(ruleArray[i].value)];
                rule.status = 'disabled';
                $scope.updateRule(ruleArray[i].value);
            }
        }
    };

    $scope.getCheckedBoxesCount = function() {
        var checkedCount = document.querySelectorAll('input.ruleCheckbox:checked').length;
        var bulkActions = document.getElementById('bulk-actions');
        var bulkDropdown = document.getElementById('bulk-dropdown');
        if (checkedCount==0) {
            bulkActions.setAttribute('disabled', 'disabled');
            bulkDropdown.style.visibility = 'hidden';
        } else {
            bulkActions.removeAttribute('disabled');
            bulkDropdown.style.visibility = 'visible';
        }
        return checkedCount;
    };

    $scope.resetFocus = function(){
        var bulkActions = document.getElementById('bulk-actions');
        bulkActions.focus();
        bulkActions.blur();
    };

    $scope.updateRule = function (id) {
        console.log("update - " + id);

        var rule = $scope.rules[findIndexById(id)];
        rule.updatedAt = Date.now();
        rule.triggerStart = document.getElementsByClassName('trigger-start ' + rule.id)[0].value;
        rule.triggerEnd = document.getElementsByClassName('trigger-end ' + rule.id)[0].value;

        delete rule._version_;

        $http.post(vm.solrUrl + '/' + vm.rulesCollection + '/update/json/docs?commit=true', rule, c).then(function(response) {
            console.log("Rule '" + id + "' updated!");
        });
    };

    $scope.changeStatus = function(id){
        var rule = $scope.rules[findIndexById(id)];
        if (rule.status == 'enabled'){
            rule.status = 'disabled';
        } else {
            rule.status = 'enabled';
        }
        $scope.updateRule(id);
    };

    $scope.addTrigger = function (id, name) {
        var rule = $scope.rules[findIndexById(id)];

        if (name == 'search_terms') {
            rule.search_terms = rule.search_terms || ["keyword"];
        } else if (name == 'tags') {
            rule.tagList = rule.tagList || ["t1"];
        } else if (name == 'category') {
            rule.category = rule.category || "cat";
        }
    };

    $scope.addAction = function (id, name) {
        var rule = $scope.rules[findIndexById(id)];

        if (name == 'product_list') {
            rule.productList = rule.productList || ["product"];
        } else if (name == 'redirect') {
            rule.redirect = rule.redirect || "/screens/touch-technology";
        } else if (name == 'banner') {
            rule.banner =  rule.banner || "banner";
        } else if (name == 'facetList') {
            rule.facetList =  rule.facetList || ["facetList"];
        } else if (name == 'rankList') {
            rule.rankList =  rule.rankList || ["rankList"];
        } else if (name == 'querySet') {
            rule.querySet =  rule.querySet || "querySet";
        }
    };

    $scope.checkActionCount = function(id){
        var actionCount=0;
        var rule = $scope.rules[findIndexById(id)];
        if (rule.productList)
            actionCount++;
        if (rule.redirect)
            actionCount++;
        if (rule.banner)
            actionCount++;
        if (rule.facetList)
            actionCount++;
        if (rule.rankList)
            actionCount++;
        if (rule.querySet)
            actionCount++;
        return actionCount;
    };

    function loadRules() {
        var url = vm.solrUrl + '/' + vm.rulesCollection + '/select/?wt=json&q=' + vm.query
            + '&fl=*,name&facet=true&facet.field=' + vm.facetField;

        $http.get(url, c).then(function(response) {

            $scope.rules = response.data.response.docs;


            var ff = response.data.facet_counts.facet_fields.type;
            console.log(ff);
            var f = [];
            for (var i = 0; i < (ff.length / 2); i++) {
                f.push([ff[2*i], ff[2*i+1]]);
            }
            $scope.facets = f;

            console.log($scope.rules);
            console.log($scope.facets);
            setTimeout(aaa, 1000); // TODO all controls should be done as Angular directives
        });
    }

    loadRules();
    setTimeout(aaa, 1000);
});


// в условие на нажата кнопка или нет нужно дабавить disable в нужные ячейки табл