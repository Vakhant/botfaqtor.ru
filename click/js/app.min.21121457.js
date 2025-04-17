/* maskPhone */
function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

// use

// maskPhone('селектор элементов', 'маска, если маску не передать то будет работать стандартная +7 (___) ___-__-__');;

/* SECTIONS */
// not jQuery
document.addEventListener('DOMContentLoaded', () => {
    /* маска для телефона */
    maskPhone('input[type="tel"]');
});
// jQuery
$(document).ready(function() {
    /* MAILER */
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    function getFormData($form) {
        var config = {};
        $form.serializeArray().map(function (item) {
            if (config[item.name]) {
                if (typeof (config[item.name]) === "string") {
                    config[item.name] = [config[item.name]];
                }
                config[item.name].push(item.value);
            } else {
                config[item.name] = item.value;
            }
        });
        var Id = getUrlParameter("id");
        config["Id"] = Id;
        var Id = getUrlParameter("h");
        config["Href"] = Id;
        var Id = getUrlParameter("r");
        config["Ref"] = Id;
        return config;
    }
    $('#mailer').submit(function (e) {
        $form = $(this);
        var formData = JSON.stringify(getFormData($form));
        formData = JSON.parse(formData);
        formData.Phone = '+' + formData.Phone.replace(/\D/g,'');
        formData = JSON.stringify(formData);

        $('.main__form-loader').addClass('main__form-loader_active');

        $.ajax({
            type: 'POST',
            url: 'https://server.botfaqtor.ru/api/Account/fraud-info-request',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            data: formData,
            success: function () {
                window.location.replace("https://botfaqtor.ru/yandex-clickfraud-v3/ty.html");
            },
            statusCode: {
                400: function(){
                    alert('Пользователь с таким email уже существует');
                    $('.main__form-loader').removeClass('main__form-loader_active');
                }
            }
        });
        e.preventDefault();
    });
});