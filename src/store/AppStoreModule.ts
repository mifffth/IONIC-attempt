import {StoreModule, StoreRootModule} from "@ngrx/store";
import {loadingReducer} from "src/store/loading/loading.reducers";
import {loginReducer} from "src/store/login/login.reducers";
import { AppState } from 'src/store/AppState';
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "src/app/pages/login/login.effects";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingReducer),
    StoreModule.forFeature("login", loginReducer),
    EffectsModule.forRoot([
        LoginEffects
    ])
]