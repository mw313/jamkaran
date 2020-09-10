class ConfigClass{
    constructor(){
      window.theme = 'Saba';
      window.themeHost = '';
      window.themeStore = {};
      window.themeBasePath = "/profile";

      this.getHost = this.getHost.bind(this);
      this.getBasePath = this.getBasePath.bind(this);
      this.getStore = this.getStore.bind(this);

      this.setHost = this.setHost.bind(this);
      this.setBasePath = this.setBasePath.bind(this);
      this.setStore = this.setStore.bind(this);
    }

    setTheme(theme){
      window.theme = theme;
    }

    setHost(host){
      window.themeHost = host;
    }

    setBasePath(path){
      window.themeBasePath = path;
    }

    setStore(store){
      window.themeStore = store;
    }

    getTheme(){
        return window.theme;
    }

    getHost(){
        return window.themeHost;
    }

    getStore(){
      return window.themeStore;
    }

    getBasePath(){
      return window.themeBasePath;
    }
}

const Config = new ConfigClass();

export default Config;
