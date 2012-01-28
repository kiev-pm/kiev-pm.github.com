function NextEvent(options) {
    var self = this;

    self._getNow = function() {
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
    };

    self._daysInMonth = function(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    };

    self._lastDayOfMonth = function(month, year) {
        var totalDays = self._daysInMonth(month, year);
        return new Date(year, month, totalDays).getDay();
    };

    self._lastDayOfWeekInMonth = function(dayOfWeek, month, year) {
        var diff = 7 - (dayOfWeek + self._lastDayOfMonth(month, year)) + 1;
        if (diff > 0) {
            diff -= 7;
        }

        var lastDate = self._daysInMonth(month, year) + diff;
        return new Date(year, month, lastDate);
    };

    self.getNextDate = function() {
        var now = self._getNow();

        var currentMonth = now.getMonth();
        var currentYear = now.getYear() + 1900;

        var dayOfWeek = 4;

        var lastThursday = self._lastDayOfWeekInMonth(dayOfWeek, currentMonth, currentYear);
        if (lastThursday < now) {
            lastThursday = self._lastDayOfWeekInMonth(dayOfWeek, currentMonth + 1, currentYear);
        }

        return lastThursday;
    };

    self.isToday = function() {
        var now = self._getNow();
        return now - self.getNextDate() == 0;
    };

    self.isThisWeek = function() {
        var now = self._getNow();
        var dayOfWeek = now.getDay();

        var startOfWeek = new Date(now.getYear() + 1900, now.getMonth(), now.getDate() - dayOfWeek + 1);
        var endOfWeek = new Date(now.getYear() + 1900, now.getMonth(), startOfWeek.getDate() + 6);

        var date = self.getNextDate();
        return date >= startOfWeek && date <= endOfWeek;
    };
}
