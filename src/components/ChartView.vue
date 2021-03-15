<template>
  <div class="chart-view">
    <div class="chart-section">
      <div class="chart-header">
        <div class="title">
          <h3>Conversiones por Campaña</h3>
        </div>
        <div class="chart-btn">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              Opciones <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-button type="primary" @click="showModal" class="options-btn">
                  {{
                    chartData.length > 1 ? "Añadir Campaña" : "Crear Gráfico"
                  }}
                </a-button>
              </a-menu-item>
              <a-menu-item>
                <a-button @click="showClearModal" class="options-btn">
                  Borrar
                </a-button>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
      <a-modal
        v-model="visible"
        okText="Terminar"
        cancelText="Cancelar"
        title="Añadir Campaña"
        @ok="handleOk"
      >
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="handleSubmit"
        >
          <a-form-item label="Campaña">
            <a-input
              v-decorator="[
                'bell',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, introduzca la campañia!',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="Conversión">
            <a-input
              v-decorator="[
                'conversion',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, introduzca la conversión!',
                    },
                    { validator: checkConversion },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button @click="clearForm()">
              Limpiar
            </a-button>
            <a-button type="primary" html-type="submit">
              Añadir
            </a-button>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal
        title="Borrar Gráfico"
        :visible="visibleCancelModal"
        :confirm-loading="confirmLoading"
        @ok="handleClearOk"
        @cancel="handleCancel"
      >
        <p>{{ ModalText }}</p>
      </a-modal>
      <div class="chart-area">
        <GChart
          class="chart"
          type="PieChart"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [["Task", "Hours per Day"]],
      chartOptions: {
        pieHole: 0.4,
      },
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      ModalText: "¿Estás seguro de que quieres borrar el gráfico?",
      visibleCancelModal: false,
      confirmLoading: false,
    };
  },
  methods: {
    showClearModal() {
      this.visibleCancelModal = true;
    },
    handleClearOk() {
      this.ModalText = "Gráfico borrado";
      this.cleanChart();
      this.confirmLoading = true;
      setTimeout(() => {
        this.visibleCancelModal = false;
        this.confirmLoading = false;
        this.ModalText = "¿Estás seguro de que quieres borrar el gráfico?";
      }, 2000);
    },
    handleCancel() {
      this.visibleCancelModal = false;
    },
    showModal() {
      this.visible = true;
    },
    cleanChart() {
      this.chartData = [["Task", "Hours per Day"]];
    },
    clearForm() {
      this.form.resetFields();
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    handleSubmit(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.chartData.push([values.bell, Number(values.conversion)]);
        }
        this.form.resetFields();
      });
      e.preventDefault();
    },

    checkConversion(rule, value, callback) {
      if (value > 0) {
        callback();
        return;
      }
      callback("El valor tiene que ser un número suprior a 0!");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 1px rgb(233, 234, 235);
  border-radius: 5px;
  box-shadow: 5px 5px 5px 5px rgb(157, 163, 162);
  width: 90%;
  height: 420px;
  margin: 0;
  padding: 10px;
  background-color: rgb(233, 234, 235);
}
.chart-section {
  height: 100%;
  border: solid 1px rgb(233, 234, 235);
  border-radius: 5px;
  width: 100%;
  background-color: white;
}
.chart-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
h3 {
  margin: 5px 10px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.65);
}
.chart-btn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 5px 10px;
}
.ant-dropdown-link {
  width: 150px;
  text-align: right;
}
.options-btn {
  width: 135px;
}
.ant-btn {
  margin-left: 5px;
}
.chart-area {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.chart {
  height: 90%;
  width: 90%;
}
</style>
