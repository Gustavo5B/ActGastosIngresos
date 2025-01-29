"use strict";

const transacciones = [];
const montoInput = document.getElementById("monto");
const descripcionInput = document.getElementById("descripcion");
const btnIngreso = document.getElementById("btnIngreso");
const btnGasto = document.getElementById("btnGasto");
const balanceSpan = document.getElementById("balance");
const listaTransacciones = document.getElementById("listaTransacciones");

btnIngreso.addEventListener("click", () => agregarTransaccion("ingreso"));
btnGasto.addEventListener("click", () => agregarTransaccion("gasto"));

function agregarTransaccion(tipo) {
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();

    if (isNaN(monto) || monto <= 0 || descripcion === "") {
        alert("Ingrese un monto válido y una descripción válida");
        return;
    }

    let balanceActual = calcularBalance();

    if (tipo === "gasto" && monto > balanceActual) {
        alert("No puedes agregar un gasto mayor al balance disponible.");
        return;
    }

    const transaccion = {
        id: Date.now(),
        monto,
        descripcion,
        tipo
    };

    transacciones.push(transaccion);
    actualizarUI();
    limpiarFormulario();
}

function actualizarUI() {
    let balance = calcularBalance();
    listaTransacciones.innerHTML = "";

    transacciones.forEach(transaccion => {
        const li = document.createElement("li");
        li.textContent = `${transaccion.descripcion}: $${transaccion.monto.toFixed(2)}`;
        li.classList.add("transaccion", transaccion.tipo);
        listaTransacciones.appendChild(li);
    });

    balanceSpan.textContent = `$${balance.toFixed(2)}`;
    balanceSpan.style.color = balance >= 0 ? "rgb(56, 204, 56)" : "red"; // Color del balance
}

function calcularBalance() {
    return transacciones.reduce((total, transaccion) => {
        return total + (transaccion.tipo === "ingreso" ? transaccion.monto : -transaccion.monto);
    }, 0);
}

function limpiarFormulario() {
    montoInput.value = "";
    descripcionInput.value = "";
}
