import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

import { EvidentlyClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../EvidentlyClient";
import { EvaluateFeatureRequest, EvaluateFeatureResponse } from "../models/models_0";
import {
  deserializeAws_restJson1EvaluateFeatureCommand,
  serializeAws_restJson1EvaluateFeatureCommand,
} from "../protocols/Aws_restJson1";

export interface EvaluateFeatureCommandInput extends EvaluateFeatureRequest {}
export interface EvaluateFeatureCommandOutput extends EvaluateFeatureResponse, __MetadataBearer {}

/**
 * <p>This operation assigns a feature variation to one given user session. You pass in an
 *         <code>entityID</code> that represents the user. Evidently then checks the evaluation rules
 *       and assigns the variation.</p>
 *          <p>The first rules that are evaluated are the override rules. If the user's
 *         <code>entityID</code> matches an override rule, the user is served the variation specified
 *       by that rule.</p>
 *          <p>Next, if there is a launch of the feature, the user might be assigned to a variation in
 *       the launch. The chance of this depends on the percentage of users that are allocated to that
 *       launch. If the user is enrolled in the launch, the variation they are served depends on the
 *       allocation of the various feature variations used for the launch.</p>
 *          <p>If the user is not assigned to a launch, and there is an ongoing experiment for this feature,  the user might
 *       be assigned to a variation in the experiment. The chance of this
 *       depends on the percentage of users that are allocated to that experiment. If the user is enrolled in the experiment,
 *       the variation they are served depends on the allocation of the various feature variations used for the experiment. </p>
 *          <p>If the user is not assigned to a launch or experiment, they are served the default variation.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { EvidentlyClient, EvaluateFeatureCommand } from "@aws-sdk/client-evidently"; // ES Modules import
 * // const { EvidentlyClient, EvaluateFeatureCommand } = require("@aws-sdk/client-evidently"); // CommonJS import
 * const client = new EvidentlyClient(config);
 * const command = new EvaluateFeatureCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link EvaluateFeatureCommandInput} for command's `input` shape.
 * @see {@link EvaluateFeatureCommandOutput} for command's `response` shape.
 * @see {@link EvidentlyClientResolvedConfig | config} for EvidentlyClient's `config` shape.
 *
 */
export class EvaluateFeatureCommand extends $Command<
  EvaluateFeatureCommandInput,
  EvaluateFeatureCommandOutput,
  EvidentlyClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: EvaluateFeatureCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: EvidentlyClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<EvaluateFeatureCommandInput, EvaluateFeatureCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "EvidentlyClient";
    const commandName = "EvaluateFeatureCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: EvaluateFeatureRequest.filterSensitiveLog,
      outputFilterSensitiveLog: EvaluateFeatureResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: EvaluateFeatureCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1EvaluateFeatureCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<EvaluateFeatureCommandOutput> {
    return deserializeAws_restJson1EvaluateFeatureCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
