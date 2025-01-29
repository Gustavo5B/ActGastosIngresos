"use strict";

type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
    id: number;
    monto: number;
    descripcion: string;
    tipo: TipoTransaccion;
}

const transacciones: Transaccion[] = [];

const montoInput = document.getElementById("monto") as HTMLInputElement;
const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
const btnIngreso = document.getElementById("btnIngreso") as HTMLButtonElement;
const btnGasto = document.getElementById("btnGasto") as HTMLButtonElement;
const balanceSpan = document.getElementById("balance") as HTMLSpanElement;
const listaTransacciones = document.getElementById("listaTransacciones") as HTMLUListElement;

btnIngreso.addEventListener("click", () => agregarTransaccion("ingreso"));
btnGasto.addEventListener("click", () => agregarTransaccion("gasto"));

function agregarTransaccion(tipo: TipoTransaccion) {
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();
    
    if (isNaN(monto) || monto <= 0 || descripcion === "") {
        alert("Ingrese un monto válido y una descripción válida");
        return;
    }
    
    const transaccion: Transaccion = {
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
    let balance = 0;
    listaTransacciones.innerHTML = "";

    transacciones.forEach(transaccion => {
        const li = document.createElement("li");
        li.textContent = `${transaccion.descripcion}: $${transaccion.monto.toFixed(2)}`;
        li.classList.add("transaccion", transaccion.tipo);
        listaTransacciones.appendChild(li);

        balance += transaccion.tipo === "ingreso" ? transaccion.monto : -transaccion.monto;
    });

    balanceSpan.textContent = `$${balance.toFixed(2)}`;
}

function limpiarFormulario() {
    montoInput.value = "";
    descripcionInput.value = "";
}
