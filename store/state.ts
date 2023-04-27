import {create} from 'zustand';

type State = {
    modals:object,
    toggle:boolean;
}

type Modal = {
    id:String,
    isOpen:boolean
}

export const useStore = create((set) => ({
    modals:{},
    toggle: false,
    setToggle: (modalId:Modal["id"],isOpen:Modal["isOpen"]):any => set((state:State) => ({
        modals:{
            ...state.modals,
            [modalId as any]: isOpen
        }
    })),
}))