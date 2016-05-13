moment.updateLocale("nb", {
    weekdaysShort: 'søn_man_tirs_ons_tors_fre_lør'.split('_')
});
moment.locale(LANG);

$(".day").each(function () {
    var $this = $(this);
    var time = moment((+$this.data("time")) * 1000);
    $this.find(".weekday").text(time.format("dddd"));
    $this.find(".weekday-short").text(time.format("ddd"));
});
