import {create} from 'zustand';


export const useStore = create((set) => ({
    modals:{},
    show:false,
    toggle: false,
    isEditable: false,
    setShow: () => set((state:State) => ({ show: !state.show})),
    setIsEditable: () => set((state:State) => ({ isEditable: !state.isEditable})),
    setToggle: (modalId:Modal["id"],isOpen:Modal["isOpen"]) => set((state:State) => ({
        modals:{
            ...state.modals,
            [modalId as string]: isOpen
        }
    })),
}))