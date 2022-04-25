const {doc, setDoc, collection, updateDoc, getDoc, getDocs, deleteDoc} = require("firebase/firestore");
const {db} = require('../config/firebase');

module.exports = {
  createPerson: async (req, res) => {
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      address: {
        address_line: req.body.address_line,
        city: req.body.city,
        province: req.body.province,
        nation: req.body.nation
      },
      phone: req.body.phone,
      email: req.body.email,
      updatedAt: new Date().toLocaleString('in-IN')
    }
    try {
      const userDocRef = doc(collection(db, "persons"));
      await setDoc(userDocRef, data).then(() => {
        res.status(201).json({
          success: true,
          message: "Person created successfully",
          data: null,
          error: null
        })
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Requested data is invalid",
        data: null,
        error: error.message
      })
    }
  },
  getAllPersons: async (req, res) => {
    try {
      const data = []
      const querySnapshot = await getDocs(collection(db, "persons"));
      querySnapshot.forEach((doc) => {
        data.push({id: doc.id, data: doc.data()})
      });
      res.status(200).json({
        success: true,
        message: null,
        data: data,
        error: null
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: null,
        data: null,
        error: error.message
      })
    }
  },
  getPersonByID: async (req, res) => {
    const personId = req.params.id
    const docRef = doc(db, "persons", personId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.status(200).json({
        message: "SUCCESS",
        result: docSnap.data()
      })
    } else {
      res.status(404).json({
        success: false,
        message: "No such document!",
        data: null,
        error: null
      })
    }
  },
  updatePersonById: async (req, res) => {
    const personId = req.params.id
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      address: {
        address_line: req.body.address_line,
        city: req.body.city,
        province: req.body.province,
        nation: req.body.nation
      },
      phone: req.body.phone,
      email: req.body.email,
      updatedAt: new Date().toLocaleString('in-IN')
    }
    const docRef = doc(db, "persons", personId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      try {
        const personDocRef = doc(db, "persons", personId)
        await updateDoc(personDocRef, data).then(() => {
          res.status(201).json({
            success: true,
            message: "Person updated successfully",
            data: null,
            error: null
          })
        })
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Requested data is invalid",
          data: null,
          error: error.message
        })
      }
    } else {
      res.status(404).json({
        success: false,
        message: "No such document!",
        data: null,
        error: null
      })
    }
  },
  deletePersonById: async (req, res) => {
    const personId = req.params.id
    const docRef = doc(db, "persons", personId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      try {
        await deleteDoc(doc(db, "persons", personId)).then(() => {
          res.status(201).json({
            success: true,
            message: "Person deleted successfully",
            data: null,
            error: null
          })
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: null,
          data: null,
          error: error.message
        })
      }
    } else {
      res.status(404).json({
        success: false,
        message: "No such document!",
        data: null,
        error: null
      })
    }
  }
}