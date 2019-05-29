angular
  .module('app')
  .controller('StatisticsController', StatisticsController)

function StatisticsController($scope, $http) {
  String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }
    var data = arguments;        
    if (arguments.length == 1 && typeof (args) == "object") {
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        }
    }
    return result;
  }
  
  $scope.vendors = ["创蓝科技", "酷曼测试"]
  $scope.channels = ["安全卫士短信接口"]
  var startTime = moment().subtract(1, 'days');
  var endTime = moment().add('days');
  var totalCount = 0;
  $scope.totalCountText = "{0} 至 {1}访问量总计为{2}次".format(startTime.format('YYYY-MM-DD'),endTime.format('YYYY-MM-DD'),0)

  $("#daterange").val(moment().add(-1, 'days').format('YYYY-MM-DD')+ '-' + moment().add('days').format('YYYY-MM-DD'))

  $(function () {
    $("input[name='daterange']").daterangepicker(
      {
        // autoApply: true,
        autoUpdateInput: false,
        // alwaysShowCalendars: true,
        ranges: {
          '今天': [moment(), moment()],
          '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          '近7天': [moment().subtract(7, 'days'), moment()],
          '这个月': [moment().startOf('month'), moment().endOf('month')],
          '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        locale: {
          format: "YYYY/MM/DD",
          separator: " - ",
          applyLabel: "确认",
          cancelLabel: "取消",
          fromLabel: "开始时间",
          toLabel: "结束时间",
          customRangeLabel: "自定义",
          daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
          monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        },
        startDate:startTime,
        endDate:endTime
      }
    ).on('cancel.daterangepicker', function (ev, picker) {
      $("#daterange").val("请选择日期范围");
      $("#startTime").val("");
      $("#endTime").val("");
    }).on('apply.daterangepicker', function (ev, picker) {
      $("#startTime").val(picker.startDate.format('YYYY-MM-DD'));
      $("#endTime").val(picker.endDate.format('YYYY-MM-DD'));
      $("#daterange").val(picker.startDate.format('YYYY-MM-DD') + " 至 " + picker.endDate.format('YYYY-MM-DD'));
      startTime = picker.startDate;
      endTime = picker.endDate;
    });

  });

  $scope.apiList = [];
  $scope.labels = [];
  $scope.series = ['Series A'];
  $scope.data = [0];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };

  $scope.submit = function(){
    // console.log("startTime: " + startTime + "endTime: " + endTime);
    // console.log("vendor: " + $scope.selVendor);
    // startTime = Math.floor(start/1000);
    // endTime = Math.floor(end/1000);
    $scope.labels = [];
    $scope.data = [];
    $scope.apiList = [];
    totalCount = 0;
    var manufacturer = $scope.selVendor == $scope.vendors[0]?1:2;
    var channel = 1;
    $http({
      method:'GET',
      url: api_out_v1 +  '/coomaan/sms_backend/api/apiaccess/?channel='+channel+'&manufacturer='+manufacturer+'&start='
       + Math.floor(startTime/1000)+'&stop=' + Math.floor(endTime/1000)
    }).then(res => {
      console.log(res.data);
      for(var i=0; i<res.data.results.length;i++){
        $scope.labels.push(res.data.results[i].date);
        $scope.data.push(res.data.results[i].success);
        totalCount += res.data.results[i].success;
      }
      if(res.data.results.length == 0){
        $scope.labels.push(0);
        $scope.data.push(0);
      }
      $scope.apiList = res.data.results;
      $scope.totalCountText = "{0} 至 {1}访问量总计为{2}次".format(moment(startTime).format('YYYY-MM-DD'),moment(endTime).format('YYYY-MM-DD'),totalCount);
      console.log($scope.totalCountText)
    },error =>{
      console.log(error);
    })
  }

  /** 第一次进入 查询默认两天数据 */
  $scope.submit();

  $scope.$watch("price",function(value){
    console.log("Value:" + value)
    if(value == undefined){
      value = 0;
    }
    $scope.totalPrice = "价格总计: {0}元".format(value * totalCount);
  });

  $scope.downFile = function(){
    console.log("downFile...")
  }
}