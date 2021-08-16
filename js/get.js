const SERVER_URL = "https://apirestflaskpythonsqlite3.parzibyte.repl.co";
Vue.use(Toasted);
Vue.filter("currency", value => {
    return "$".concat(parseFloat(value).toFixed(2));
});
new Vue({
    el: "#app",
    data: () => ({
        tasks: [],
    }),
    methods: {
        async getTasks() {
            const url = SERVER_URL + "/games";
            const r = await fetch(url);
            const tasks = await r.json();
            this.tasks = tasks;
        },
        edit(task) {
            window.location.href = "./edit.html?id=" + task[0];
        },
        async deleteTask(task) {
            const result = await Swal.fire({
                title: 'Delete',
                text: "Esta seguro de borrar esta Tarea?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1f9bcf',
                cancelButtonColor: '#d9534f',
                cancelButtonText: 'No',
                confirmButtonText: 'Si'
            });
            // Stop if user did not confirm
            if (!result.value) {
                return;
            }
            const r = await fetch(SERVER_URL + "/game/" + task[0], {
                method: "DELETE",
            });
            const response = await r.json();
            if (response) {
                this.$toasted.show("Borrado con éxito", {
                    position: "top-left",
                    duration: 1000,
                });
                await this.getTasks();
            } else {
                this.$toasted.show("Ha ocurrido un error", {
                    position: "top-left",
                    duration: 1000,
                });
            }
        }
    },
    async mounted() {
        await this.getTasks();
    }
});