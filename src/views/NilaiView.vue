<template>
  <!-- Data Nilai -->
  <section class="mahasiswa container py-3">
    <h1 class="display-3 text-center text-uppercase fw-bold">DATA NILAI</h1>

    <!-- Tabel data nilai -->
    <table v-if="update.updateMode === false" class="table mt-5">
      <thead class="table-light">
        <th>Nama</th>
        <th>NIM</th>
        <th>Kehadiran</th>
        <th>Tugas</th>
        <th>UAS</th>
        <th>UTS</th>
        <th>Grade</th>
        <th></th>
      </thead>
      <tbody v-for="data in state.mahasiswa" :key="data._id">
        <tr>
          <td>{{ data.nama }}</td>
          <td>{{ data.nim }}</td>
          <td>{{ data.nilai.kehadiran }}</td>
          <td>{{ data.nilai.tugas }}</td>
          <td>{{ data.nilai.uts }}</td>
          <td>{{ data.nilai.uas }}</td>
          <td>{{ data.nilai.grade }}</td>
          <td class="d-flex justify-content-center gap-3">
            <button
              class="btn btn-success"
              @click.prevent="updateNewNilai(data)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Input data nilai -->
    <form v-else class="row g-3">
      <div class="col-md-6">
        <!-- Nama -->
        <div class="mb-3">
          <label for="inputNamaMahasiswa" class="form-label">Nama</label>
          <input
            type="text"
            class="form-control"
            id="inputNamaMahasiswa"
            v-model="state.newNama"
            disabled
          />
        </div>

        <!-- NIM -->
        <div class="mb-3">
          <label for="inputNimMahasiswa" class="form-label">NIM</label>
          <input
            type="text"
            class="form-control"
            id="inputNimMahasiswa"
            v-model="state.newNim"
            disabled
          />
        </div>

        <!-- Kehadiran -->
        <div class="mb-3">
          <label class="form-label" for="inputKehadiranMahasiswa"
            >Kehadiran</label
          >
          <div class="d-flex align-items-center justify-content-between gap-3">
            <button
              class="btn btn-primary"
              @click.prevent="state.newNilai.kehadiran--"
              :disabled="state.newNilai.kehadiran <= 0"
            >
              -
            </button>
            <input
              type="number"
              class="form-control"
              id="inputNilaiKehadiran"
              v-model="state.newNilai.kehadiran"
              disabled
              required
            />
            <button
              class="btn btn-primary"
              @click.prevent="state.newNilai.kehadiran++"
              :disabled="state.newNilai.kehadiran >= 14"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <!-- Tugas -->
        <div class="mb-3">
          <label for="inputNilaiTugas" class="form-label">Tugas</label>
          <input
            type="number"
            class="form-control"
            id="inputNilaiTugas"
            v-model="state.newNilai.tugas"
            @input="limitInput(state.newNilai, 'tugas')"
            placeholder="Masukkan kehadiran..."
            required
          />
        </div>

        <!-- UTS -->
        <div class="mb-3">
          <label for="inputNilaiUTS" class="form-label">UTS</label>
          <input
            type="number"
            class="form-control"
            id="inputNilaiUTS"
            v-model="state.newNilai.uts"
            @input="limitInput(state.newNilai, 'uts')"
            placeholder="Masukkan kehadiran..."
            required
          />
        </div>

        <!-- UAS -->
        <div class="mb-3">
          <label for="inputNilaiUAS" class="form-label">UAS</label>
          <input
            type="number"
            class="form-control"
            id="inputNilaiUAS"
            v-model="state.newNilai.uas"
            @input="limitInput(state.newNilai, 'uas')"
            placeholder="Masukkan kehadiran..."
            required
          />
        </div>
      </div>

      <!-- Submit button -->
      <div class="col-12">
        <button
          type="submit"
          class="btn btn-success w-100 mb-2"
          @click.prevent="
            {
              editNilai(update.updateId);
              update.updateMode = false;
            }
          "
          :disabled="validateNilai === false"
        >
          UPDATE
        </button>
        <button
          type="submit"
          class="btn btn-danger w-100 mb-5"
          @click.prevent="update.updateMode = false"
        >
          CANCEL
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import crud from "../module/crud";

export default {
  setup() {
    const { state, cleanState, validateNilai, getAllMahasiswa, editNilai } =
      crud();

    const update = ref({
      updateMode: false,
      updateId: "",
    });

    function updateNewNilai(data) {
      update.value.updateMode = true;
      update.value.updateId = data._id;

      state.value.newNama = data.nama;
      state.value.newNim = data.nim;
      state.value.newNilai.kehadiran = data.nilai.kehadiran;
      state.value.newNilai.tugas = data.nilai.tugas;
      state.value.newNilai.uts = data.nilai.uts;
      state.value.newNilai.uas = data.nilai.uas;
    }

    function limitInput(obj, prop) {
      let value = obj[prop];
      if (value < 0) value = 0;
      if (value > 100) value = 100;
      obj[prop] = value;
    }

    onMounted(() => {
      getAllMahasiswa();
      cleanState();
    });

    return {
      update,
      updateNewNilai,
      limitInput,
      state,
      cleanState,
      validateNilai,
      getAllMahasiswa,
      editNilai,
    };
  },
};
</script>
