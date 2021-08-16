const SERVER_URL = "https://apirestflaskpythonsqlite3.parzibyte.repl.co";
Vue.use(Toasted);
new Vue({
    el: "#app",
    data: () => ({
        task: {
            id: null,
            name: "",
            price: "",
            rate: "",
        },
    }),
    async mounted() {
        await this.getTaskDetails();
    },
    methods: {
        async getTaskDetails() {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const id = urlSearchParams.get("id");
            const r = await fetch(`${SERVER_URL}/game/${id}`);
            const task = await r.json();
            this.task = {
                id: task[0],
                name: task[1],
                price: task[2],
                rate: task[3],
            };
        },
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
                method: "PUT",
                body: payload,
                headers: {
                    "Content-type": "application/json",
                }
            });
            const response = await r.json();
            if (response) {
                window.location.href = "./get.html";
            } else {
                this.$toasted.show("Ha habido un error", {
                    position: "top-left",
                    duration: 1000,
                });
            }
        }
    }
});