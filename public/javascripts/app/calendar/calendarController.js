angular.module('appointmentModule')
  .controller('calendarController', calendarController);

calendarController.$inject = ['$scope', '$timeout', 'moment', 'appointmentService'];

function calendarController ($scope, $timeout, moment, appointmentService) {

    var vm = this;
    var events = [];


    getAllAppointmentSlots();

    function getAllAppointmentSlots() {
      appointmentService.getAllAppointmentSlots()
      .success(function (data) {
        if (data && data.slots && data.slots.length > 0) {
          console.log(data.slots);
          //var slots = JSON.parse(data.slots);
          //console.log("slots");
          //console.log(slots);
          for ( var i in data.slots) {
            var slot = data.slots[i];
            var date = moment(moment(slot.date).format('L')+ ' ' + slot.time);
            //var d = new Date(moment(slot.date).format('L')+ ' ' + slot.time);
            var start = new Date(moment(slot.date).format('L')+ ' ' + slot.time);
            //var end = new Date(start
            var d = new Date(Date.parse(slot.date));
            //d.setTime(String(slot.time));
            console.log(d.getDate());
            console.log(String(slot.time));
            //console.log(data.slots[i]);
            //console.log(moment(slot.date).format('LLLL'));
            //console.log(moment(moment(slot.date).format('L')+ ' ' + slot.time) .format('LLLL'));
            //console.log(moment().toDate());
            //console.log(moment(slot.date).format('L'));
            //console.log(date.format('LLLL'));
            //console.log(date.add(slot.duration, 'minutes').format('LLLL'));
            //console.log(new Date(2014,8,26,15));
            vm.events.push( {
              title: 'Schedule',
              startsAt: start,
              //endsAt: new Date(date.add(slot.duration, 'minutes')),
              recursOn: 'month',
              type: 'info'
            } );
          }
        }
      });
    }
    //console.log("slots");
    //console.log(slots);

    
    console.log("events");
    console.log(vm.events);
    //vm.events = events;
    vm.calendarView = 'week';
    vm.viewDate = moment().toDate();
    vm.isCellOpen = true;

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

  }