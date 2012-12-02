/*
    jQuery Paypal Buy It Now Plugin v1.0
    Copyright (c) 2012 Sam Deering, jquery4u.com

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    DEMO: http://samdeering.com/jquerypaypalbuyitnow/
    DOWNLOAD: https://github.com/sdeering/jquerypaypalbuyitnow
    ARTICLE: http://jquery4u.com/plugins/jquerypaypalbuyitnow/

*/
;(function($){
    $.fn.extend({
        paypalBuyButton: function(options)
        {
            this.defaultOptions = {};
            var settings = $.extend({}, this.defaultOptions, options);

            //construct form
            var formHTML = '<form id="'+settings.formId+'" name="_xclick" action="https://www.paypal.com/'+settings.countryCode+'/cgi-bin/webscr" method="post">\
            <input type="hidden" name="cmd" value="_xclick">\
            <input type="hidden" name="business" value="'+settings.email+'">\
            <input type="hidden" name="currency_code" value="'+settings.currencyCode+'">\
            <input type="hidden" name="item_name" value="'+settings.itemName+'">\
            <input type="hidden" name="amount" value="'+settings.basePrice+'">';

            //add options
            $.each(settings.options, function(i, option)
            {
                switch(option.type)
                {
                    case "select":
                        formHTML += '<select name="select-'+i+'">';
                        $.each(option.values, function(key, val)
                        {
                            formHTML += '<option value="'+val+'">'+key+' ($'+val+')</option>';
                        });
                        formHTML += '</select>';

                        //select box change handler
                        $('select[name="select-'+i+'"]').live('change', function(e)
                        {
                            console.log($(this).val());
                            $('#'+settings.formId+' input[name="amount"]').val($(this).val());
                        });
                        break;
                    default:
                }
            });

            formHTML += '<p id="'+settings.formId+'-price"></p>';

            formHTML += '<p><input type="image" border="0" alt="PayPal &mdash; The safer, easier way to pay online." name="submit" src="https://www.paypalobjects.com/en_AU/i/btn/btn_buynowCC_LG.gif" style="width: 107px; height: 47px;"></form>';

            //add form to container
            $(this).html(formHTML);

            return this.each(function()
            {
                var $this = $(this);
            });
        }
    });
})(jQuery);
