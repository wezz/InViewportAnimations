export default class InVIewPortElements
{
	constructor(initialDelay)
	{
		this.inviewportElements = [];
		if (typeof initialDelay !== "number")
		{
			initialDelay = 200;
		}
		
		this.inviewportElements = document.querySelectorAll("[data-inviewport]");

		this.bindScrollEvent();
		window.setTimeout(this.scrollCheck.bind(this),initialDelay)		
	}
	bindScrollEvent()
	{
		// Determin if the browser supports passive mode in scroll event binding
		let supportsPassive = false;
		try {
		var opts = Object.defineProperty({}, 'passive', {
			get: function() {
			supportsPassive = true;
			}
		});
		window.addEventListener("testPassive", null, opts);
		window.removeEventListener("testPassive", null, opts);
		} catch (e) {}

		window.addEventListener("scroll", this.scrollCheck.bind(this), supportsPassive ? { passive: true } : false);
	}
	setClassToElement(element,classText, delayed)
	{
		element.dataset["inviewport"] = "true";
		element.setAttribute("data-inviewport","true");
		element.className += " " + classText;
	}
	isInViewport(el)
	{
		var r, html;
		if ( !el || 1 !== el.nodeType ) { return false; }
		html = document.documentElement;
		r = el.getBoundingClientRect();
		return ( !!r
		  && r.bottom >= 0
		  && r.right >= 0
		  && r.top <= html.clientHeight
		  && r.left <= html.clientWidth
		);
	}
	scrollCheck()
	{
		for (var index = 0; index < this.inviewportElements.length; index++)
		{
			var element = this.inviewportElements[index];
			if(element.dataset)
			{
				var hasBeenInViewport = (element.dataset["inviewport"]) ? element.dataset["inviewport"]  === "true" : false;
				var timer = (element.dataset["inviewtimer"]) ? element.dataset["inviewtimer"]: null;
				var classText = (element.dataset["inviewportClass"]) ? element.dataset["inviewportClass"] : null;
				var delay = (element.dataset["inviewportDelay"]) ? parseInt(element.dataset["inviewportDelay"],10) : 0;

				if(hasBeenInViewport == false && classText != null && element.className.indexOf(classText) === -1)
				{
					var elementIsInViewport = this.isInViewport(element) === true;
					if(elementIsInViewport)
					{
						if(delay)
						{
							if(timer === null)
							{
								element.dataset["inviewtimer"] = window.setTimeout(this.setClassToElement.bind(this,element, classText, true),delay);
							}
						}
						else
						{
							this.setClassToElement(element, classText, false);

						}

					}
				}
			}
		}
	}
}