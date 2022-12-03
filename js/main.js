app = Vue.createApp({
	data() {
		return {
			result: "0",
			is_calc: false,
			dataArrays: [
				["7", "8", "9", "÷"],
				["4", "5", "6", "×"],
				["1", "2", "3", "-"],
				["0", ".", "=", "+"]
			],
			operators_list: ["÷", "×", "-", "+"  ]
		}
	},

	methods: {
		c_click() {
			this.result = "0";
			this.is_calc = false;
		},

		btn_click(column) {
			if (this.operators_list.includes(column)) {
				this.ope_click(column);
			} else if (column === "=") {
				this.equal_click();
			} else {
				this.num_click(column);
			}
		},

		num_click(column) {
			if (this.is_calc) {
				this.result = "0";
				this.is_calc = false;
			}

			if (this.result === "0" && column === "0") {
				this.result = "0";
			} else if (this.result === "0" && column === ".") {
				this.result = "0.";
			} else if (this.result === "0") {
				this.result = column;
			} else {
				this.result += column;
			}
		},

		ope_click(column) {
			if (this.is_calc) {
				this.is_calc = false;
			}

			if (this.is_ope_last()) {
				this.result = this.result.slice(0, -1) + column;
			} else {
				this.result += column;
			}
		},

		equal_click() {
			if (this.is_ope_last()) {
				this.result = this.result.slice(0, -1);
			}

			let temp = new Function("return " + this.result.replaceAll("×", "*").replaceAll("÷", "/"))();
			if (temp == Infinity || Number.isNaN(temp)) {
				this.result = "Error";
			} else {
				this.result = temp;
				this.is_calc = true;
			}
		},

		is_ope_last() {
			return this.operators_list.includes(this.result.toString().slice(-1));
		}
	}
})

app.mount('#app')