const API_CLIENTES = "http://localhost:4000/api/clientes";
    const API_PEDIDOS = "http://localhost:4000/api/pedidos";

    // ---------------- CLIENTES ----------------
    const clienteForm = document.getElementById("clienteForm");
    const clientesTable = document.getElementById("clientesTable");
    const formTitleCliente = document.getElementById("formTitleCliente");
    const cancelClienteBtn = document.getElementById("cancelClienteBtn");
    let editClienteMode = false;

    async function fetchClientes() {
      const res = await fetch(API_CLIENTES);
      const data = await res.json();
      clientesTable.innerHTML = "";
      data.forEach(cliente => {
        clientesTable.innerHTML += `
          <tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.correo}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editCliente(${cliente.clienteid}, '${cliente.nombre}', '${cliente.apellido}', '${cliente.telefono}', '${cliente.correo}')">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deleteCliente(${cliente.clienteid})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    }

    clienteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const clienteid = document.getElementById("clienteid").value;
      const cliente = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value
      };

      if (!editClienteMode) {
        await fetch(API_CLIENTES, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cliente) });
      } else {
        await fetch(`${API_CLIENTES}/${clienteid}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cliente) });
        editClienteMode = false;
      }
      clienteForm.reset();
      formTitleCliente.textContent = "Agregar Cliente";
      fetchClientes();
    });

    function editCliente(id, nombre, apellido, telefono, correo) {
      document.getElementById("clienteid").value = id;
      document.getElementById("nombre").value = nombre;
      document.getElementById("apellido").value = apellido;
      document.getElementById("telefono").value = telefono;
      document.getElementById("correo").value = correo;
      formTitleCliente.textContent = "Editar Cliente";
      editClienteMode = true;
    }

    async function deleteCliente(id) {
      if (confirm("¿Eliminar este cliente?")) {
        await fetch(`${API_CLIENTES}/${id}`, { method: "DELETE" });
        fetchClientes();
      }
    }

    cancelClienteBtn.addEventListener("click", () => {
      clienteForm.reset();
      formTitleCliente.textContent = "Agregar Cliente";
      editClienteMode = false;
    });

    // ---------------- PEDIDOS ----------------
    const pedidoForm = document.getElementById("pedidoForm");
    const pedidosTable = document.getElementById("pedidosTable");
    const formTitlePedido = document.getElementById("formTitlePedido");
    const cancelPedidoBtn = document.getElementById("cancelPedidoBtn");
    let editPedidoMode = false;

    async function fetchPedidos() {
      const res = await fetch(API_PEDIDOS);
      const data = await res.json();
      pedidosTable.innerHTML = "";
      data.forEach(pedido => {
        pedidosTable.innerHTML += `
          <tr>
            <td>${pedido.pedidoid}</td>
            <td>${pedido.clienteid}</td>
            <td>${pedido.tipoflor}</td>
            <td>${pedido.cantidad}</td>
            <td>${pedido.preciototal}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editPedido(${pedido.pedidoid}, ${pedido.clienteid}, '${pedido.tipoflor}', ${pedido.cantidad}, ${pedido.preciototal})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deletePedido(${pedido.pedidoid})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    }

    pedidoForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const pedidoId = document.getElementById("pedidoId").value;
      const pedido = {
        clienteid: document.getElementById("clienteid").value,
        tipoflor: document.getElementById("tipoflor").value,
        cantidad: document.getElementById("cantidad").value,
        preciototal: document.getElementById("preciototal").value
      };

      if (!editPedidoMode) {
        await fetch(API_PEDIDOS, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pedido) });
      } else {
        await fetch(`${API_PEDIDOS}/${pedidoId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pedido) });
        editPedidoMode = false;
      }
      pedidoForm.reset();
      formTitlePedido.textContent = "Agregar Pedido";
      fetchPedidos();
    });

    function editPedido(id, clienteid, tipoflor, cantidad, preciototal) {
      document.getElementById("pedidoId").value = id;
      document.getElementById("clienteid").value = clienteid;
      document.getElementById("tipoflor").value = tipoflor;
      document.getElementById("cantidad").value = cantidad;
      document.getElementById("preciototal").value = preciototal;
      formTitlePedido.textContent = "Editar Pedido";
      editPedidoMode = true;
    }

    async function deletePedido(id) {
      if (confirm("¿Eliminar este pedido?")) {
        await fetch(`${API_PEDIDOS}/${id}`, { method: "DELETE" });
        fetchPedidos();
      }
    }

    cancelPedidoBtn.addEventListener("click", () => {
      pedidoForm.reset();
      formTitlePedido.textContent = "Agregar Pedido";
      editPedidoMode = false;
    });

    // Inicializar ambas tablas
    fetchClientes();
    fetchPedidos();