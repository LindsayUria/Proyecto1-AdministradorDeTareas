const SERVER_URL = "https://apirestflaskpythonsqlite3.parzibyte.repl.co";
Vue.use(Toasted);
new Vue({
    el: "#app",
    data: () => ({
        task: {
            name: "",
            price: "",
            rate: "",
        },
    }),
    methods: {
        async save() {
            if (!this.task.name) {
                return this.$toasted.show("Ingrese el titulo", {
                    position: "top-left",
                    duration: 1000,
                });
            }

            if (!this.task.price) {
                return this.$toasted.show("Ingrese la descripción", {
                    position: "top-left",
                    duration: 1000,
                });
            }
            if (!this.task.rate) {
                return this.$toasted.show("Ingrese el estado", {
                    position: "top-left",
                    duration: 1000,
                });
            }
            const payload = JSON.stringify(this.task);
            const url = SERVER_URL + "/game";
            const r = await fetch(url, {
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json",
                }
            });
            const response = await r.json();
            if (response) {
                this.$toasted.show("Guardado con éxito", {
                    position: "top-left",
                    duration: 1000,
                });
                this.task = {
                    name: "",
                    price: null,
                    rate: null,
                };
            } else {
                this.$toasted.show("Hubo un error", {
                    position: "top-left",
                    duration: 1000,
                });
            }
        }
    }
});