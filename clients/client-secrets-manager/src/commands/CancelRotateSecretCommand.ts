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

import { CancelRotateSecretRequest, CancelRotateSecretResponse } from "../models/models_0";
import {
  deserializeAws_json1_1CancelRotateSecretCommand,
  serializeAws_json1_1CancelRotateSecretCommand,
} from "../protocols/Aws_json1_1";
import { SecretsManagerClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SecretsManagerClient";

export interface CancelRotateSecretCommandInput extends CancelRotateSecretRequest {}
export interface CancelRotateSecretCommandOutput extends CancelRotateSecretResponse, __MetadataBearer {}

/**
 * <p>Disables automatic scheduled rotation and cancels the rotation of a secret if currently in
 *       progress.</p>
 *          <p>To re-enable scheduled rotation, call <a>RotateSecret</a> with
 *         <code>AutomaticallyRotateAfterDays</code> set to a value greater than 0. This immediately
 *       rotates your secret and then enables the automatic schedule.</p>
 *          <note>
 *             <p>If you cancel a rotation while in progress, it can leave the <code>VersionStage</code>
 *         labels in an unexpected state. Depending on the step of the rotation in progress, you might
 *         need to remove the staging label <code>AWSPENDING</code> from the partially created version, specified
 *         by the <code>VersionId</code> response value. You should also evaluate the partially rotated
 *         new version to see if it should be deleted, which you can do by removing all staging labels
 *         from the new version <code>VersionStage</code> field.</p>
 *          </note>
 *          <p>To successfully start a rotation, the staging label <code>AWSPENDING</code> must be in one of the
 *       following states:</p>
 *          <ul>
 *             <li>
 *                <p>Not attached to any version at all</p>
 *             </li>
 *             <li>
 *                <p>Attached to the same version as the staging label <code>AWSCURRENT</code>
 *                </p>
 *             </li>
 *          </ul>
 *          <p>If the staging label <code>AWSPENDING</code> attached to a different version than the version with
 *       <code>AWSCURRENT</code> then the attempt to rotate fails.</p>
 *
 *          <p>
 *             <b>Minimum permissions</b>
 *          </p>
 *          <p>To run this command, you must have the following permissions:</p>
 *          <ul>
 *             <li>
 *                <p>secretsmanager:CancelRotateSecret</p>
 *             </li>
 *          </ul>
 *          <p>
 *             <b>Related operations</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>To configure rotation for a secret or to manually trigger a rotation, use <a>RotateSecret</a>.</p>
 *             </li>
 *             <li>
 *                <p>To get the rotation configuration details for a secret, use <a>DescribeSecret</a>.</p>
 *             </li>
 *             <li>
 *                <p>To list all of the currently available secrets, use <a>ListSecrets</a>.</p>
 *             </li>
 *             <li>
 *                <p>To list all of the versions currently associated with a secret, use <a>ListSecretVersionIds</a>.</p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SecretsManagerClient, CancelRotateSecretCommand } from "@aws-sdk/client-secrets-manager"; // ES Modules import
 * // const { SecretsManagerClient, CancelRotateSecretCommand } = require("@aws-sdk/client-secrets-manager"); // CommonJS import
 * const client = new SecretsManagerClient(config);
 * const command = new CancelRotateSecretCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CancelRotateSecretCommandInput} for command's `input` shape.
 * @see {@link CancelRotateSecretCommandOutput} for command's `response` shape.
 * @see {@link SecretsManagerClientResolvedConfig | config} for SecretsManagerClient's `config` shape.
 *
 */
export class CancelRotateSecretCommand extends $Command<
  CancelRotateSecretCommandInput,
  CancelRotateSecretCommandOutput,
  SecretsManagerClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CancelRotateSecretCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: SecretsManagerClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<CancelRotateSecretCommandInput, CancelRotateSecretCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "SecretsManagerClient";
    const commandName = "CancelRotateSecretCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CancelRotateSecretRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CancelRotateSecretResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CancelRotateSecretCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CancelRotateSecretCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CancelRotateSecretCommandOutput> {
    return deserializeAws_json1_1CancelRotateSecretCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
