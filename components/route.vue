<template>
  <div>
    <h2>{{processedRoute.method}} {{processedRoute.paths[0]}}</h2>
    <h3 id="http-request">HTTP Request</h3>
    <p>
      <code>{{processedRoute.method}} {{processedRoute.path}}</code>
    </p>
    <h3 id="query-parameters" v-if="processedRoute.queryParameters.length">Query Parameters</h3>
    <table v-if="processedRoute.queryParameters.length">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>include_cats</td>
          <td>false</td>
          <td>If set to true, the result will also include cats.</td>
        </tr>
        <tr>
          <td>available</td>
          <td>true</td>
          <td>If set to false, the result will include kittens that have already been adopted.</td>
        </tr>
      </tbody>
    </table>
    <h3 id="url-parameters" v-if="processedRoute.urlParameters.length">URL Parameters</h3>
    <table v-if="processedRoute.urlParameters.length">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="urlParameter in processedRoute.urlParameters" :key="urlParameter">
          <td>{{urlParameter.slice(1)}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- <section id="get-all-kittens">
                                                        <h2>Get All Kittens</h2>
                                                        <pre class="highlight ruby tab-ruby" style="display: none;">
                                                            <code>
                                                              <span class="nb">require</span> <span class="s1">'kittn'</span>

                                                                          <span class="n">api</span> <span class="o">=</span> <span class="no">Kittn</span><span class="o">::</span><span class="no">APIClient</span><span class="p">.</span><span class="nf">authorize!</span><span class="p">(</span><span class="s1">'meowmeowmeow'</span><span class="p">)</span>
                                                                          <span class="n">api</span><span class="p">.</span><span class="nf">kittens</span><span class="p">.</span><span class="nf">get</span>
                                                                          </code></pre>
                                                        <pre class="highlight python tab-python" style="display: none;"><code><span class="kn">import</span> <span class="nn">kittn</span>

                                                                          <span class="n">api</span> <span class="o">=</span> <span class="n">kittn</span><span class="o">.</span><span class="n">authorize</span><span class="p">(</span><span class="s">'meowmeowmeow'</span><span class="p">)</span>
                                                                          <span class="n">api</span><span class="o">.</span><span class="n">kittens</span><span class="o">.</span><span class="n">get</span><span class="p">()</span>
                                                                          </code></pre>
                                                        <pre class="highlight shell tab-shell" style="display: none;"><code>curl <span class="s2">"http://example.com/api/kittens"</span>
                                                                            -H <span class="s2">"Authorization: meowmeowmeow"</span>
                                                                          </code></pre>
                                                        <pre class="highlight javascript tab-javascript" style="display: block;"><code><span class="kr">const</span> <span class="nx">kittn</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">'kittn'</span><span class="p">);</span>

                                                                          <span class="kd">let</span> <span class="nx">api</span> <span class="o">=</span> <span class="nx">kittn</span><span class="p">.</span><span class="nx">authorize</span><span class="p">(</span><span class="s1">'meowmeowmeow'</span><span class="p">);</span>
                                                                          <span class="kd">let</span> <span class="nx">kittens</span> <span class="o">=</span> <span class="nx">api</span><span class="p">.</span><span class="nx">kittens</span><span class="p">.</span><span class="nx">get</span><span class="p">();</span>
                                                                          </code></pre>
                                                        <blockquote>
                                                          <p>The above command returns JSON structured like this:</p>
                                                        </blockquote>
                                                        <pre class="highlight json tab-json">
                                                              <code>
                                                                <span class="p">[</span>
                                                                <span class="w"></span>
                                                                <span class="p">{</span>
                                                                <span class="w">
                                                                              </span><span class="s2">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">1</span><span class="p">,</span><span class="w">
                                                                              </span><span class="s2">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Fluffums"</span><span class="p">,</span><span class="w">
                                                                              </span><span class="s2">"breed"</span><span class="p">:</span><span class="w"> </span><span class="s2">"calico"</span><span class="p">,</span><span class="w">
                                                                              </span><span class="s2">"fluffiness"</span><span class="p">:</span><span class="w"> </span><span class="mi">6</span><span class="p">,</span><span class="w">
                                                                              </span><span class="s2">"cuteness"</span><span class="p">:</span><span class="w"> </span><span class="mi">7</span><span class="w">
                                                                            </span><span class="p">},</span><span class="w">
                                                                            </span><span class="p">{</span><span class="w">
                                                                              </span><span class="s2">"id"</span><span class="p">:</span><span class="w"> </span><span class="mi">2</span><span class="p">,</span><span class="w">
                                                                              </span><span class="s2">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Max"</span><span class="p">,</span><span class="w">
                                                                              </span><span class="s2">"breed"</span><span class="p">:</span><span class="w"> </span><span class="s2">"unknown"</span><span class="p">,</span><span class="w">
                                                                              </span><span class="s2">"fluffiness"</span><span class="p">:</span><span class="w"> </span><span class="mi">5</span><span class="p">,</span><span class="w">
                                                                              </span><span class="s2">"cuteness"</span><span class="p">:</span><span class="w"> </span><span class="mi">10</span><span class="w">
                                                                            </span><span class="p">}</span><span class="w">
                                                                          </span><span class="p">]</span><span class="w">
                                                                          </span></code></pre>
                                                        <p>This endpoint retrieves all kittens.</p>
                                                        <h3 id="http-request">HTTP Request</h3>
                                                        <p>
                                                          <code>GET http://example.com/api/kittens</code>
                                                        </p>
                                                        <h3 id="query-parameters">Query Parameters</h3>
                                                        <table>
                                                          <thead>
                                                            <tr>
                                                              <th>Parameter</th>
                                                              <th>Default</th>
                                                              <th>Description</th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            <tr>
                                                              <td>include_cats</td>
                                                              <td>false</td>
                                                              <td>If set to true, the result will also include cats.</td>
                                                            </tr>
                                                            <tr>
                                                              <td>available</td>
                                                              <td>true</td>
                                                              <td>If set to false, the result will include kittens that have already been adopted.</td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <h3 id="url-parameters">URL Parameters</h3>
                                                        <table>
                                                          <thead>
                                                            <tr>
                                                              <th>Parameter</th>
                                                              <th>Description</th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            <tr>
                                                              <td>ID</td>
                                                              <td>The ID of the kitten to retrieve</td>
                                                            </tr>
                                                          </tbody>
                                                        </table>

                                                        <aside class="success">
                                                          Remember — a happy kitten is an authenticated kitten!
                                                        </aside>
                                                      </section> -->
</template>

<script>
export default {
  props: ['processedRoute']
}
</script>
