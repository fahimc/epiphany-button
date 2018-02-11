(() => {
  class EpiphanyButton {
    constructor(element) {
      this.element = element;
      this.addListeners();
      this.render();
    }
    addStyles() {}
    addListeners() {
      Epiphany.model.description = this.element.getAttribute('description');
      Epiphany.model.address = this.element.getAttribute('address');
      Epiphany.model.amount = this.element.getAttribute('amount');
      Epiphany.updatePopup();
      this.element.addEventListener('click', this.onClick.bind(this));
    }
    onClick(event) {
    	Epiphany.showPopup();
    }
    render() {
      this.element.innerHTML = '<img src="https://www.epiphanycoins.com/img/icon/epiphany_logo_28.png"><span>epiphany</span> <small>check out</small>';
    }
  };

  let Epiphany = {
    EPIPHANY_BUTTON_TAG: 'epiphany-button',
    EPIPHANY_BUTTON_STYLE_URL: 'epiphany-button.css',
    STYLE_ID: 'epiphany-button-style',
    popup:null,
    model:{
      description:'',
      address:'',
      amount:''
    },
    init() {
      document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    },
    onLoad() {
      this.loadStyle();
      this.createPopup();
      this.showPopup();
      this.update();
    },
    loadStyle() {
      if (!document.getElementById(this.STYLE_ID)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = this.STYLE_ID;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = this.EPIPHANY_BUTTON_STYLE_URL;
        link.media = 'all';
        head.appendChild(link);
      }
    },
    createPopup(){
    	this.popup = document.createElement('epiphany-popup');
    	this.popup.innerHTML = `<popup-container>
                                <epiphany-header>
                                <img src="https://www.epiphanycoins.com/img/icon/epiphany_logo_28.png">
                                <span>epiphany</span> <small>check out</small>
                                  <epiphany-close onclick='Epiphany.onPopupCloseClicked()'>x</epiphany-close>
                                </epiphany-header>
                                <epiphany-section>
                                  <span>payment address</span><br>
                                  <epiphany-address>${this.model.address}</epiphany-address><br>
                                  <span>description</span><br>
                                  <epiphany-description>${this.model.description}</epiphany-description><br>
                                  <span>amount</span><br>
                                  <epiphany-amount>${this.model.amount}</epiphany-amount>
                                </epiphany-section>
                              </popup-container>`;
    	document.body.appendChild(this.popup);
    },
    update() {
      let buttonCollection = document.querySelectorAll(this.EPIPHANY_BUTTON_TAG);
      buttonCollection.forEach((element) => {
        let epiphanyButton = new EpiphanyButton(element);

      });

    },
    updatePopup(){
      this.popup.querySelector('epiphany-address').textContent = this.model.address;
      this.popup.querySelector('epiphany-amount').textContent = this.model.amount;
      this.popup.querySelector('epiphany-description').textContent = this.model.description;
    },
    onPopupCloseClicked(){
    	console.log('popup closed');
    	this.hidePopup();
    },
    showPopup(){
    	this.popup.classList.add('show');
    },
    hidePopup(){
    	this.popup.classList.remove('show');
    },
    getInstance(){
    	return {
        model:this.model,
        update:this.update.bind(this),
    		updatePopup:this.updatePopup.bind(this),
    		onPopupCloseClicked:this.onPopupCloseClicked.bind(this),
    		showPopup:this.showPopup.bind(this),
    		hidePopup:this.hidePopup.bind(this)
    	}
    }
  }
  Epiphany.init();
  window.Epiphany = Epiphany.getInstance();
})();
