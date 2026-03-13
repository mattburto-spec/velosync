import { useReducer, useCallback } from "react";
import type { BagPosition, GearItem, PackingItem } from "@/types";
import type { BagTemplate } from "@/components/loadout/bag-templates";

// --- State types ---

export interface PlacedBag {
  id: string; // client-generated UUID
  templateId: string;
  position: BagPosition;
  name: string;
  volumeMax: number; // ml
  maxWeight: number; // grams
  shape: BagTemplate["shape"];
}

export interface LoadoutItem {
  id: string;
  gearItemId: string;
  bagId: string;
  gearItem: GearItem;
}

export type ActiveDragType =
  | { kind: "bag-template"; template: BagTemplate }
  | { kind: "gear-item"; gearItem: GearItem }
  | null;

export interface LoadoutState {
  placedBags: PlacedBag[];
  packedItems: LoadoutItem[];
  inspectedBagId: string | null;
  activeDrag: ActiveDragType;
}

// --- Actions ---

type LoadoutAction =
  | { type: "PLACE_BAG"; template: BagTemplate; position: BagPosition }
  | { type: "REMOVE_BAG"; bagId: string }
  | { type: "MOVE_BAG"; bagId: string; position: BagPosition }
  | { type: "PACK_ITEM"; gearItem: GearItem; bagId: string }
  | { type: "UNPACK_ITEM"; itemId: string }
  | { type: "MOVE_ITEM"; itemId: string; toBagId: string }
  | { type: "SET_INSPECTED_BAG"; bagId: string | null }
  | { type: "SET_ACTIVE_DRAG"; drag: ActiveDragType }
  | { type: "CLEAR_ALL" };

// --- Helpers ---

let idCounter = 0;
function genId() {
  return `loadout-${Date.now()}-${++idCounter}`;
}

// --- Reducer ---

function loadoutReducer(state: LoadoutState, action: LoadoutAction): LoadoutState {
  switch (action.type) {
    case "PLACE_BAG": {
      // Don't double-place on same position
      if (state.placedBags.some((b) => b.position === action.position)) {
        return state;
      }
      const bag: PlacedBag = {
        id: genId(),
        templateId: action.template.id,
        position: action.position,
        name: action.template.name,
        volumeMax: action.template.volumeMax,
        maxWeight: action.template.maxWeight,
        shape: action.template.shape,
      };
      return { ...state, placedBags: [...state.placedBags, bag] };
    }

    case "REMOVE_BAG": {
      return {
        ...state,
        placedBags: state.placedBags.filter((b) => b.id !== action.bagId),
        packedItems: state.packedItems.filter((i) => i.bagId !== action.bagId),
        inspectedBagId:
          state.inspectedBagId === action.bagId ? null : state.inspectedBagId,
      };
    }

    case "MOVE_BAG": {
      if (state.placedBags.some((b) => b.position === action.position)) {
        return state; // position occupied
      }
      return {
        ...state,
        placedBags: state.placedBags.map((b) =>
          b.id === action.bagId ? { ...b, position: action.position } : b
        ),
      };
    }

    case "PACK_ITEM": {
      // Don't double-pack same gear item
      if (state.packedItems.some((i) => i.gearItemId === action.gearItem.id)) {
        return state;
      }
      const item: LoadoutItem = {
        id: genId(),
        gearItemId: action.gearItem.id,
        bagId: action.bagId,
        gearItem: action.gearItem,
      };
      return { ...state, packedItems: [...state.packedItems, item] };
    }

    case "UNPACK_ITEM": {
      return {
        ...state,
        packedItems: state.packedItems.filter((i) => i.id !== action.itemId),
      };
    }

    case "MOVE_ITEM": {
      return {
        ...state,
        packedItems: state.packedItems.map((i) =>
          i.id === action.itemId ? { ...i, bagId: action.toBagId } : i
        ),
      };
    }

    case "SET_INSPECTED_BAG":
      return { ...state, inspectedBagId: action.bagId };

    case "SET_ACTIVE_DRAG":
      return { ...state, activeDrag: action.drag };

    case "CLEAR_ALL":
      return initialState;

    default:
      return state;
  }
}

const initialState: LoadoutState = {
  placedBags: [],
  packedItems: [],
  inspectedBagId: null,
  activeDrag: null,
};

// --- Hook ---

export function useLoadoutState() {
  const [state, dispatch] = useReducer(loadoutReducer, initialState);

  const placeBag = useCallback(
    (template: BagTemplate, position: BagPosition) =>
      dispatch({ type: "PLACE_BAG", template, position }),
    []
  );

  const removeBag = useCallback(
    (bagId: string) => dispatch({ type: "REMOVE_BAG", bagId }),
    []
  );

  const moveBag = useCallback(
    (bagId: string, position: BagPosition) =>
      dispatch({ type: "MOVE_BAG", bagId, position }),
    []
  );

  const packItem = useCallback(
    (gearItem: GearItem, bagId: string) =>
      dispatch({ type: "PACK_ITEM", gearItem, bagId }),
    []
  );

  const unpackItem = useCallback(
    (itemId: string) => dispatch({ type: "UNPACK_ITEM", itemId }),
    []
  );

  const moveItem = useCallback(
    (itemId: string, toBagId: string) =>
      dispatch({ type: "MOVE_ITEM", itemId, toBagId }),
    []
  );

  const setInspectedBag = useCallback(
    (bagId: string | null) =>
      dispatch({ type: "SET_INSPECTED_BAG", bagId }),
    []
  );

  const setActiveDrag = useCallback(
    (drag: ActiveDragType) => dispatch({ type: "SET_ACTIVE_DRAG", drag }),
    []
  );

  const clearAll = useCallback(() => dispatch({ type: "CLEAR_ALL" }), []);

  // Computed values
  const getBagItems = useCallback(
    (bagId: string) => state.packedItems.filter((i) => i.bagId === bagId),
    [state.packedItems]
  );

  const getBagWeight = useCallback(
    (bagId: string) =>
      state.packedItems
        .filter((i) => i.bagId === bagId)
        .reduce((sum, i) => sum + (i.gearItem.weight_grams ?? 0), 0),
    [state.packedItems]
  );

  const totalWeight = state.packedItems.reduce(
    (sum, i) => sum + (i.gearItem.weight_grams ?? 0),
    0
  );

  const packedGearIds = new Set(state.packedItems.map((i) => i.gearItemId));

  return {
    state,
    placeBag,
    removeBag,
    moveBag,
    packItem,
    unpackItem,
    moveItem,
    setInspectedBag,
    setActiveDrag,
    clearAll,
    getBagItems,
    getBagWeight,
    totalWeight,
    packedGearIds,
  };
}
