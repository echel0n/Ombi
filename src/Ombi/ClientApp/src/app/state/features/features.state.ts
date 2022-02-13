import { Action, State, StateContext } from "@ngxs/store";
import { LoadFeatures, UpdateFeature } from "./features.actions";

import { FEATURES_STATE_TOKEN } from "./types";
import { FeatureService } from "../../services/feature.service";
import { IFeatureEnablement } from "../../interfaces";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@State({
    name: FEATURES_STATE_TOKEN
})
@Injectable()
export class FeatureState {
    constructor(private featuresService: FeatureService) { }

    @Action(LoadFeatures)
    public load({ setState }: StateContext<IFeatureEnablement[]>): Observable<IFeatureEnablement[]> {
        return this.featuresService.getFeatures().pipe(
            tap(features =>
                setState(features)
                )
        );
    }

    @Action(UpdateFeature)
    public update({ setState }: StateContext<IFeatureEnablement[]>, { feature }: UpdateFeature): Observable<IFeatureEnablement[]> {
        return this.featuresService.update(feature).pipe(
            tap((result) => setState(result))
        );
    }
}