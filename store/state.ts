import {create} from 'zustand';

type State = {
    modals:object,
    toggle:boolean;
    showSidebar:boolean;
    setShow:() => void;
}

type Modal = {
    id:String,
    isOpen:boolean
}

export const useStore = create((set) => ({
    modals:{},
    show:false,
    toggle: false,
    setShow: () => set((state:any) => ({ show: !state.show})),
    setToggle: (modalId:Modal["id"],isOpen:Modal["isOpen"]):any => set((state:State) => ({
        modals:{
            ...state.modals,
            [modalId as any]: isOpen
        }
    })),
}))