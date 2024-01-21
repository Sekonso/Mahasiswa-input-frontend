import { ref, computed } from "vue";

const GetMahasiswa = () => {
  const state = ref({
    newNama: "",
    newNim: "",
    newKelas: "",
    newJk: "",
    newJurusan: "",
    newSemester: 1,
    newNilai: {
      kehadiran: 0,
      tugas: 0,
      uts: 0,
      uas: 0,
      grade: "E",
    },
    mahasiswa: {},
  });

  const cleanState = () => {
    state.value.newNama = "";
    state.value.newNim = "";
    state.value.newKelas = "";
    state.value.newJk = "";
    state.value.newJurusan = "";
    state.value.newSemester = 1;
    state.value.newNilai = {
      kehadiran: 0,
      tugas: 0,
      uts: 0,
      uas: 0,
      grade: "E",
    };
  };

  const validateState = computed(() => {
    if (
      state.value.newNama == "" ||
      state.value.newNim == "" ||
      state.value.newKelas == "" ||
      state.value.newJk == "" ||
      state.value.newJurusan == ""
    ) {
      return false;
    } else {
      return true;
    }
  });

  const validateNilai = computed(() => {
    if (
      !state.value.newNilai.tugas ||
      !state.value.newNilai.uts ||
      !state.value.newNilai.uas
    ) {
      return false;
    } else {
      return true;
    }
  });

  const calculateNilai = () => {
    const totalNilai =
      state.value.newNilai.tugas * 0.2 +
      state.value.newNilai.uts * 0.3 +
      state.value.newNilai.uas * 0.5;

    if (state.value.newNilai.kehadiran < 8) {
      return "E";
    } else {
      if (totalNilai > 85) {
        return "A";
      } else if (totalNilai >= 75) {
        return "B";
      } else if (totalNilai >= 65) {
        return "C";
      } else if (totalNilai >= 55) {
        return "D";
      } else {
        return "E";
      }
    }
  };

  const getAllMahasiswa = async () => {
    try {
      await fetch("http://localhost:3000/mahasiswa")
        .then((res) => res.json())
        .then((data) => {
          state.value.mahasiswa = data;
        });
    } catch (err) {
      console.log(err);
    }
  };

  const newMahasiswa = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": state.token
        },
        body: JSON.stringify({
          nama: state.value.newNama,
          nim: state.value.newNim,
          kelas: state.value.newKelas,
          jk: state.value.newJk,
          jurusan: state.value.newJurusan,
          semester: state.value.newSemester,
          nilai: state.value.newNilai,
        }),
      };

      await fetch("http://localhost:3000/mahasiswa/new", requestOptions);
      await getAllMahasiswa();
      cleanState();
    } catch (err) {
      console.log("Boohoo" + err);
    }
  };

  const deleteMahasiswa = async (_id) => {
    try {
      await fetch(`http://localhost:3000/mahasiswa/delete/${_id}`, {
        method: "DELETE",
      });
      await getAllMahasiswa();
    } catch (err) {
      console.log(err);
    }
  };

  const editMahasiswa = async (_id) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": state.token
        },
        body: JSON.stringify({
          nama: state.value.newNama,
          nim: state.value.newNim,
          kelas: state.value.newKelas,
          jk: state.value.newJk,
          jurusan: state.value.newJurusan,
          semester: state.value.newSemester,
        }),
      };

      await fetch(
        `http://localhost:3000/mahasiswa/update/${_id}`,
        requestOptions
      );
      await getAllMahasiswa();
      cleanState();
    } catch (err) {
      console.log(err);
    }
  };

  const editNilai = async (_id) => {
    try {
      state.value.newNilai.grade = calculateNilai();

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": state.token
        },
        body: JSON.stringify({
          nilai: {
            kehadiran: state.value.newNilai.kehadiran,
            tugas: state.value.newNilai.tugas,
            uts: state.value.newNilai.uts,
            uas: state.value.newNilai.uas,
            grade: state.value.newNilai.grade,
          },
        }),
      };

      await fetch(
        `http://localhost:3000/mahasiswa/nilai/update/${_id}`,
        requestOptions
      );
      await getAllMahasiswa();
      cleanState();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    state,
    cleanState,
    validateState,
    validateNilai,
    getAllMahasiswa,
    newMahasiswa,
    deleteMahasiswa,
    editMahasiswa,
    editNilai,
  };
};

export default GetMahasiswa;
