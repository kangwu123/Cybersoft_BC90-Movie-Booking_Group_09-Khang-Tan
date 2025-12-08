import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    logos: [],
    locations: [],
    roles: [
        { id: 'admin', name: 'Admin', permissions: ['manage_movies', 'manage_users', 'manage_settings'] },
        { id: 'manager', name: 'Manager', permissions: ['manage_movies', 'manage_settings'] },
        { id: 'staff', name: 'Staff', permissions: ['manage_movies'] },
    ],
    notifications: {
        bookingAmount: true,
        revenue: true,
        thresholdBooking: 10,
        thresholdRevenue: 10000000,
    }
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        addLogo(state, action) {
            state.logos.push(action.payload)
        },
        updateLogo(state, action) {
            const idx = state.logos.findIndex(l => l.id === action.payload.id)
            if (idx !== -1) state.logos[idx] = action.payload
        },
        deleteLogo(state, action) {
            state.logos = state.logos.filter(l => l.id !== action.payload)
        },
        addLocation(state, action) {
            state.locations.push(action.payload)
        },
        updateLocation(state, action) {
            const idx = state.locations.findIndex(l => l.id === action.payload.id)
            if (idx !== -1) state.locations[idx] = action.payload
        },
        deleteLocation(state, action) {
            state.locations = state.locations.filter(l => l.id !== action.payload)
        },
        addRole(state, action) {
            state.roles.push(action.payload)
        },
        updateRole(state, action) {
            const idx = state.roles.findIndex(r => r.id === action.payload.id)
            if (idx !== -1) state.roles[idx] = action.payload
        },
        deleteRole(state, action) {
            state.roles = state.roles.filter(r => r.id !== action.payload)
        },
        updateNotifications(state, action) {
            state.notifications = { ...state.notifications, ...action.payload }
        }
    }
})

export const { addLogo, updateLogo, deleteLogo, addLocation, updateLocation, deleteLocation, addRole, updateRole, deleteRole, updateNotifications } = settingsSlice.actions

export default settingsSlice.reducer
