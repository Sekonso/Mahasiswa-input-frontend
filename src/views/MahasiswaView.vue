<template>
  <!-- Data Mahasiswa -->
  <section class="mahasiswa container py-3">
    <h1 class="display-3 text-center text-uppercase fw-bold">DATA MAHASISWA</h1>

    <!-- Input data mahasiswa -->
    <form class="row g-3">
      <div class="col-md-6">
        <!-- Nama -->
        <div class="mb-3">
          <label for="inputNamaMahasiswa" class="form-label">Nama</label>
          <input
            type="text"
            class="form-control"
            id="inputNamaMahasiswa"
            placeholder="Masukkan nama..."
            v-model="state.newNama"
            required
          />
        </div>

        <!-- NIM -->
        <div class="mb-3">
          <label for="inputNimMahasiswa" class="form-label">NIM</label>
          <input
            type="text"
            class="form-control"
            id="inputNimMahasiswa"
            placeholder="Masukkan NIM..."
            v-model="state.newNim"
            required
          />
        </div>

        <!-- Kelas -->
        <div class="mb-3">
          <label for="inputKelasMahasiswa" class="form-label">Kelas</label>
          <input
            type="text"
            class="form-control"
            id="inputKelasMahasiswa"
            placeholder="Masukkan Kelas..."
            v-model="state.newKelas"
            required
          />
        </div>
      </div>

      <div class="col-md-6">
        <!-- Jenis Kelamin -->
        <div class="mb-3">
          <label class="form-label">Jenis Kelamin</label>
          <div>
            <span>
              <input
                class="form-check-input mx-1"
                type="radio"
                name="inputJkMahasiswa"
                id="inputJkPria"
                value="Pria"
                v-model="state.newJk"
                required
              />
              <label class="form-check-label" for="inputJkPria"> Pria </label>
            </span>
            <span class="mx-3">
              <input
                class="form-check-input mx-1"
                type="radio"
                name="inputJkMahasiswa"
                id="inputJkWanita"
                value="Wanita"
                v-model="state.newJk"
              />
              <label class="form-check-label" for="inputJkWanita">
                Wanita
              </label>
            </span>
          </div>
        </div>

        <!-- Jurusan -->
        <div class="mb-3">
          <label class="form-label">Jurusan</label>
          <select
            class="form-select"
            aria-label="Select jurusan"
            v-model="state.newJurusan"
            required
          >
            <option value="" selected disabled>Pilih Jurusan</option>
            <option value="Data Science">Data Science</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
            <option value="Teknik Informatika">Teknik Informatika</option>
          </select>
        </div>

        <!-- Semester -->
        <div class="mb-3">
          <label class="form-label" for="inputSemesterMahasiswa"
            >Semester</label
          >
          <div class="d-flex align-items-center justify-content-between gap-3">
            <button
              class="btn btn-primary"
              @click.prevent="state.newSemester--"
              :disabled="state.newSemester <= 1"
            >
              -
            </button>
            <input
              type="number"
              class="form-control"
              id="inputSemesterMahasiswa"
              v-model="state.newSemester"
              disabled
              required
            />
            <button
              class="btn btn-primary"
              @click.prevent="state.newSemester++"
              :disabled="state.newSemester >= 14"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <div class="col-12">
        <button
          v-if="edit.editMode === false"
          type="submit"
          class="btn btn-primary w-100 mb-5"
          @click.prevent="newMahasiswa()"
          :disabled="validateState === false"
        >
          SUBMIT
        </button>
        <button
          v-else
          type="submit"
          class="btn btn-success w-100 mb-5"
          @click.prevent="
            {
              editMahasiswa(edit.editId);
              edit.editMode = false;
            }
          "
          :disabled="validateState === false"
        >
          EDIT
        </button>
      </div>
    </form>

    <!-- Tabel data mahasiswa -->
    <table class="table">
      <thead class="table-light">
        <th>Nama</th>
        <th>NIM</th>
        <th>Kelas</th>
        <th>JK</th>
        <th>Jurusan</th>
        <th>Semester</th>
        <th></th>
      </thead>
      <tbody v-for="data in state.mahasiswa" :key="data._id">
        <tr>
          <td>{{ data.nama }}</td>
          <td>{{ data.nim }}</td>
          <td>{{ data.kelas }}</td>
          <td>{{ data.jk }}</td>
          <td>{{ data.jurusan }}</td>
          <td>{{ data.semester }}</td>
          <td class="d-flex justify-content-center gap-3">
            <button
              v-if="edit.editMode === false || data._id !== edit.editId"
              class="btn btn-success"
              @click.prevent="editing(data)"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
            <button
              v-else
              class="btn btn-danger"
              @click.prevent="
                {
                  edit.editMode = false;
                  cleanState();
                }
              "
            >
              <i class="bi bi-x"></i>
            </button>
            <button
              class="btn btn-danger"
              @click.prevent="
                {
                  deleteMahasiswa(data._id);
                  edit.editMode = false;
                  cleanState();
                }
              "
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import crud from "../module/crud";

export default {
  setup() {
    const {
      state,
      cleanState,
      validateState,
      getAllMahasiswa,
      newMahasiswa,
      deleteMahasiswa,
      editMahasiswa,
    } = crud();

    const edit = ref({
      editMode: false,
      editId: "",
    });

    function editing(data) {
      state.value.newNama = data.nama;
      state.value.newNim = data.nim;
      state.value.newKelas = data.kelas;
      state.value.newJk = data.jk;
      state.value.newJurusan = data.jurusan;
      state.value.newSemester = data.semester;

      edit.value.editMode = true;
      edit.value.editId = data._id;
    }

    onMounted(() => {
      getAllMahasiswa();
      cleanState();
    });

    return {
      edit,
      editing,
      state,
      cleanState,
      validateState,
      getAllMahasiswa,
      newMahasiswa,
      deleteMahasiswa,
      editMahasiswa,
    };
  },
};
</script>
