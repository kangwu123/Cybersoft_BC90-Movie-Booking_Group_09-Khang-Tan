import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../services/api'

export const fetchHeThongRap = createAsyncThunk('timeshow/fetchHeThongRap', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('QuanLyRap/LayThongTinHeThongRap')
        return res.data.content
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const fetchCumRap = createAsyncThunk('timeshow/fetchCumRap', async (maHeThongRap, { rejectWithValue }) => {
    try {
        const res = await api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
        return res.data.content
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const createSchedule = createAsyncThunk('timeshow/createSchedule', async (payload, { rejectWithValue }) => {
    try {
        const res = await api.post('QuanLyDatVe/TaoLichChieu', payload)
        return res.data.content
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const fetchLichChieu = createAsyncThunk('timeshow/fetchLichChieu', async (maPhim, { rejectWithValue }) => {
    try {
        const res = await api.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP07`)
        return res.data.content
    } catch (err) {
        return rejectWithValue(err)
    }
})

const slice = createSlice({
    name: 'timeshow',
    initialState: { loading: false, heThongRap: [], cumRap: [], error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHeThongRap.pending, (state) => { state.loading = true })
        builder.addCase(fetchHeThongRap.fulfilled, (state, action) => { state.loading = false; state.heThongRap = action.payload })
        builder.addCase(fetchHeThongRap.rejected, (state, action) => { state.loading = false; state.error = action.payload })

        builder.addCase(fetchCumRap.pending, (state) => { state.loading = true })
        builder.addCase(fetchCumRap.fulfilled, (state, action) => { state.loading = false; state.cumRap = action.payload })
        builder.addCase(fetchCumRap.rejected, (state, action) => { state.loading = false; state.error = action.payload })

        builder.addCase(createSchedule.pending, (state) => { state.loading = true })
        builder.addCase(createSchedule.fulfilled, (state) => { state.loading = false })
        builder.addCase(createSchedule.rejected, (state, action) => { state.loading = false; state.error = action.payload })
   
        builder.addCase(fetchLichChieu.pending, (state) => { state.loading = true })
        builder.addCase(fetchLichChieu.fulfilled, (state, action) => { state.loading = false; state.lichChieu = action.payload })
        builder.addCase(fetchLichChieu.rejected, (state, action) => { state.loading = false; state.error = action.payload })
    }
})

export default slice.reducer
