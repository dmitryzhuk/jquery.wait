#jquery-wait

Tiny jquery plugin to display wait notification for async operations and then to convert wait notification into error box if operation failed. This plugin should be initialized on HTML element which is the subject of async operation (normally it is the one which will be updated as a result of succesful async operation completion). When notification box or error box is visible it will completely overlap subject element effectively disabling any user interation with it.

There is only one option for this plugin: 

<table>

<tr>
<th>delay</th>
<td>
    Delay in milliseconds before wait notification actually appears. It is neccessary to prevent blinking when async operation is pretty fast. Default value is 400.
</td>
</tr>

</table>

There are few commands which allow to control plugin state.

<table>

<tr>
<th>show</th>
<td>
    Displays wait notification as soon as `delay` is already passed and async operation is still not complete.
    Allows to specify message which appears on the notification box.
    <pre><code>
$(element).wait({ 'action': 'show', 'message': 'Doing async operation' });
    </code></pre>
</td>
</tr>

<tr>
<th>hide</th>
<td>
    Simply makes a notification box invisible. This command should be issued upon normal completion of async operation.
    <pre><code>
$(element).wait({ 'action': 'hide' });
    </code></pre>
</td>
</tr>

<tr>
<th>error</th>
<td>
    Changes appearance of notification box replacing `wait` animation by `error` icon and replacing original message
    with error message.
    <pre><code>
$(element).wait({ 'action': 'error', 'message': 'Failed async operation' });
    </code></pre>
    Note, that to simplify using this plugin with AJAX, message value can be XHR object:
    <pre><code>
$(element).wait({ 'action': 'error', 'message': xhr });
    </code></pre>
    Plugin will construct an error message using xhr state:
    <pre><code>
if (xhr.status === 0) {
    return 'No connection.\nVerify Network.';
} else if (xhr.status === 500) {
    return 'Error 500: Internal Server Error.';
} else if (xhr.status === 404) {
    return 'Error 404: Resource not found';
} else {
    return 'Error ' + xhr.status;
}
    </code></pre>
</td>
</tr>

</table>

