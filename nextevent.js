function daysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
}

function lastDayOfMonth(month, year) {
    var totalDays = daysInMonth(month, year);
    return new Date(year, month, totalDays).getDay();
}

function lastDayOfWeekInMonth(dayOfWeek, month, year) {
    var diff = 7 - (dayOfWeek + lastDayOfMonth(month, year)) + 1;
    if (diff > 0) {
        diff -= 7;
    }

    var lastDate = daysInMonth(month, year) + diff;
    return new Date(year, month, lastDate);
}

function NextEvent(options) {
    var self = this;

    self.getNextDate = function() {
        var now = new Date();

        var currentMonth = now.getMonth();
        var currentYear = now.getYear() + 1900;

        var dayOfWeek = 4;

        var lastThursday = lastDayOfWeekInMonth(dayOfWeek, currentMonth, currentYear);
        if (lastThursday < new Date()) {
            lastThursday = lastDayOfWeekInMonth(dayOfWeek, currentMonth + 1, currentYear);
        }

        return lastThursday;
    };

    self.isToday = function() {
        return new Date() == self.getNextDate();
    };

    self.isThisWeek = function() {
        var now = new Date();
        var dayOfWeek = now.getDay();

        var startOfWeek = now.getDate() - dayOfWeek;
        var endOfWeek = startOfWeek + 7;

        var date = self.getNextDate().getDate();
        return date >= startOfWeek && date <= endOfWeek;
    };
}
