

var Toast = {};

Toast.install =  function(Vue, options) {
	var defaultOpt = {
		type: 'top',
		duration: 8000
	}
	
	for (var key in options) {
		defaultOpt[key] = options[key];
	}

	Vue.prototype.$toast = (tips, type) => {
		if (type) {
			defaultOpt.type = type;
		}
		if (Toast.hasInstance) {
			return;
		}

		let toastTpl = Vue.extend({
			template: '<div class="vue-toast vue-'+defaultOpt.type+'">' + tips + '</div>'
		});

		let tpl = new toastTpl().$mount().$el;
		
		document.body.appendChild(tpl);
		Toast.hasInstance = true;
		setTimeout(function () {
		    document.body.removeChild(tpl);
		    Toast.hasInstance = false;
		}, defaultOpt.duration)
	}

	['top', 'center', 'bottom'].forEach(function(type) {
		Vue.prototype.$toast[type] = (tips) => {
			return Vue.prototype.$toast(tips, type);
		}
	})
}

module.exports = Toast